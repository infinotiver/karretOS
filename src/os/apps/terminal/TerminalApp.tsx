import { useEffect, useRef, useState } from "react";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import type { AppId, AppProps } from "../types";

type TerminalLine =
  | { kind: "command"; cmd: string }
  | { kind: "output"; text: string };

export default function TerminalApp({ onOpenApp }: AppProps) {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: TerminalLine[] = [...lines, { kind: "command", cmd }];

    if (trimmed === "clear") {
      setLines([]);
      setInput("");
      return;
    } else if (trimmed === "whoami") {
      newLines.push({ kind: "output", text: "root@karretOS" });
    } else if (trimmed === "help") {
      newLines.push({ kind: "output", text: "Available commands:" });
      newLines.push({ kind: "output", text: "  clear - Clear terminal" });
      newLines.push({ kind: "output", text: "  whoami - Show current user" });
      newLines.push({ kind: "output", text: "  help - Show this message" });
      newLines.push({
        kind: "output",
        text: "  open <app-id> - Open an application",
      });
    } else if (trimmed.startsWith("open")) {
      const appId = cmd.slice(5).trim() as AppId;
      if (!appId) {
        newLines.push({ kind: "output", text: "usage: open <app-id>" });
      } else if (onOpenApp) {
        newLines.push({ kind: "output", text: `Trying to open: ${appId}` });
        onOpenApp(appId);
      }
    } else {
      newLines.push({ kind: "output", text: `command not found: ${cmd}` });
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <WindowLayout footer="Type 'help' for available commands">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">
              {line.kind === "command" ? (
                <>
                  <span className="text-green-500">$ </span>
                  <span className="text-amber-400">{line.cmd}</span>
                </>
              ) : (
                <span>{line.text}</span>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex gap-2 border-t border-border/40 p-4 font-mono text-sm"
        >
          <span className="text-green-500">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-amber-400 outline-none"
            autoFocus
          />
        </form>
      </div>
    </WindowLayout>
  );
}
