import { loadEnv } from "vite";
import { mkdir, rm, writeFile } from "fs/promises";
import path from "path";

const env = loadEnv("production", process.cwd(), "");
const apiKey = env.WAKATIME_API_KEY || process.env.WAKATIME_API_KEY;
const outputPath = path.resolve(process.cwd(), "public", "wakatime.json");

const cleanup = async () => {
    try {
        await rm(outputPath);
    } catch {
        // ignore missing file
    }
};

const main = async () => {
    if (!apiKey) {
        console.log("[wakatime] No API key found, skipping static stats generation.");
        await cleanup();
        return;
    }

    const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`;
    const url = "https://wakatime.com/api/v1/users/current/stats/last_7_days";

    try {
        const response = await fetch(url, {
            headers: {
                Authorization: authHeader,
            },
        });

        if (!response.ok) {
            throw new Error(`WakaTime request failed with status ${response.status}`);
        }

        const data = await response.json();
        await mkdir(path.dirname(outputPath), { recursive: true });
        await writeFile(outputPath, JSON.stringify(data, null, 2), "utf8");
        console.log("[wakatime] Wrote public/wakatime.json");
    } catch (error) {
        console.error("[wakatime] Failed to generate static stats:", error);
        await cleanup();
    }
};

await main();
