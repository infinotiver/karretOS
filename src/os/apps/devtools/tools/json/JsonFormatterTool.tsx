import { useState } from "react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);

  const formatJson = (pretty: boolean) => {
    try {
      setError(null);
      const parsed = JSON.parse(input || "{}");
      setOutput(JSON.stringify(parsed, null, pretty ? 2 : 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setOutput("");
    }
  };

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
    } catch {
      // ignore clipboard failures
    }
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            JSON Formatter
          </h2>
          <p className="text-xs text-muted-foreground">
            Paste JSON, format or minify instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => formatJson(true)}
            className="rounded-lg border border-border/50 bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/50"
          >
            Format
          </button>
          <button
            type="button"
            onClick={() => formatJson(false)}
            className="rounded-lg border border-border/50 bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/50"
          >
            Minify
          </button>
          <button
            type="button"
            onClick={copyOutput}
            className="rounded-lg border border-border/50 bg-background/70 px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted/50"
          >
            Copy
          </button>
        </div>
      </header>

      <div className="grid flex-1 gap-3 md:grid-cols-2">
        <div className="flex h-full flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Input
          </p>
          <textarea
            className="min-h-[240px] flex-1 resize-none rounded-xl border border-border/50 bg-background/60 p-3 text-xs leading-relaxed text-foreground outline-none focus:border-primary/50"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste JSON here..."
          />
        </div>
        <div className="flex h-full flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Output
          </p>
          <textarea
            className="min-h-[240px] flex-1 resize-none rounded-xl border border-border/50 bg-background/60 p-3 text-xs leading-relaxed text-foreground outline-none"
            value={output}
            readOnly
            placeholder="Formatted JSON will appear here..."
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
