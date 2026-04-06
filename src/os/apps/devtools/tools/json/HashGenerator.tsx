import { useEffect, useMemo, useState } from "react";
import { Copy } from "lucide-react";

type Algo = "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const ALGORITHMS: Algo[] = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];

const toHex = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

export default function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<Algo>("SHA-256");
  const [hash, setHash] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const computeHash = async () => {
      if (!input) {
        setHash("");
        setError(null);
        return;
      }

      try {
        setError(null);
        const bytes = new TextEncoder().encode(input);
        const digest = await crypto.subtle.digest(algorithm, bytes);
        if (!cancelled) {
          setHash(toHex(digest));
        }
      } catch (err) {
        if (!cancelled) {
          setHash("");
          setError(err instanceof Error ? err.message : "Failed to hash input");
        }
      }
    };

    void computeHash();

    return () => {
      cancelled = true;
    };
  }, [input, algorithm]);

  const hashLength = useMemo(() => hash.length, [hash]);

  const copyHash = async () => {
    if (!hash) return;
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Hash Generator
          </h2>
          <p className="text-xs text-muted-foreground">
            Real-time hashing for text input.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as Algo)}
            className="h-9 rounded-lg border border-border/50 bg-background/70 px-2 text-xs text-foreground outline-none"
            aria-label="Select hashing algorithm"
          >
            {ALGORITHMS.map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={copyHash}
            disabled={!hash}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/70 text-foreground transition hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Copy hash"
            title={copied ? "Copied" : "Copy"}
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="grid flex-1 gap-3 md:grid-cols-2">
        <div className="flex h-full flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Input
          </p>
          <textarea
            className="min-h-60 flex-1 resize-none rounded-xl border border-border/50 bg-background/60 p-3 text-xs leading-relaxed text-foreground outline-none focus:border-primary/50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type text to hash..."
          />
        </div>

        <div className="flex h-full flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Output ({hashLength} chars)
          </p>
          <textarea
            className="min-h-60 flex-1 resize-none rounded-xl border border-border/50 bg-background/60 p-3 font-mono text-xs leading-relaxed text-foreground outline-none"
            value={hash}
            readOnly
            placeholder="Hash will appear here..."
          />
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
