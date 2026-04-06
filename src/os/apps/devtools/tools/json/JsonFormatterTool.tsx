import { useMemo, useState } from "react";
import { Copy } from "lucide-react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: "", error: null as string | null };
    }

    try {
      const parsed = JSON.parse(input);
      return { output: JSON.stringify(parsed, null, 2), error: null };
    } catch (err) {
      return {
        output: "",
        error: err instanceof Error ? err.message : "Invalid JSON",
      };
    }
  }, [input]);

  const copyOutput = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
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
            Real-time JSON formatting.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyOutput}
            disabled={!output}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-background/70 text-foreground transition hover:bg-muted/50 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Copy formatted JSON"
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
            placeholder="Paste JSON here..."
          />
        </div>
        <div className="flex h-full flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Output
          </p>
          <textarea
            className="min-h-60 flex-1 resize-none rounded-xl border border-border/50 bg-background/60 p-3 text-xs leading-relaxed text-foreground outline-none"
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
