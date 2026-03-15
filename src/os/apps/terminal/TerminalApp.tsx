import { useEffect, useRef, useState } from "react";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import type { AppId, AppProps } from "../types";

export default function TerminalApp({ onOpenApp }: AppProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [lines]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines = [...lines, `$ ${cmd}`];

    if (trimmed === "clear") {
      setLines([]);
      setInput("");
      return;
    } else if (trimmed === "whoami") {
      newLines.push("root@karretOS");
    } else if (trimmed === "help") {
      newLines.push("Available commands: clear, whoami, help, open <app-id>");
    } else if (trimmed.startsWith("open")) {
      const appId = cmd.slice(5).trim() as AppId;
      if (!appId) {
        newLines.push("usage: open <app-id>");
      } else if (onOpenApp) {
        newLines.push(`Trying to open: ${appId}`);
        onOpenApp(appId);
      }
    } else {
      newLines.push(`command not found: ${cmd}`);
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <WindowLayout footer="Type 'help' for available commands">
      <div className="flex h-full w-full flex-col overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 font-mono text-sm">
          {lines.map((line, i) => (
            <div key={i} className="wrap-break-word whitespace-pre-wrap">
              {line}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(input);
          }}
          className="flex gap-2 p-4 font-mono text-sm border-t border-border/40"
        >
          <span>$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none"
            autoFocus
          />
        </form>
      </div>
    </WindowLayout>
  );
}
