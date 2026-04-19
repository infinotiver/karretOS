import type { ReactNode, ComponentType, KeyboardEvent } from "react";

type TileApp = {
  id: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
};

interface AppTileProps {
  app: TileApp;
  selected?: boolean;
  layout?: "vertical" | "horizontal";
  title?: string;
  onSelect?: () => void;
  onOpen?: () => void;
  footer?: ReactNode;
  action?: ReactNode;
}

export function AppTile({
  app,
  selected = false,
  layout = "vertical",
  title,
  onSelect,
  onOpen,
  footer,
  action,
}: AppTileProps) {
  const Icon = app.icon;

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") onOpen?.();
  };

  const isVertical = layout === "vertical";

  return (
    <div
      className={`rounded-lg border p-2 ${
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border/40 bg-background/40"
      }`}
    >
      <button
        type="button"
        onClick={onSelect}
        onDoubleClick={onOpen}
        onKeyDown={onKeyDown}
        className={
          isVertical
            ? "flex w-full flex-col items-center gap-2"
            : "flex w-full items-center gap-2 text-left"
        }
        title={title ?? app.title}
      >
        <span
          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
            selected ? "bg-primary/15" : "bg-muted/60"
          }`}
        >
          <Icon
            className={`h-5 w-5 ${selected ? "text-primary" : "text-muted-foreground"}`}
          />
        </span>

        <p
          className={
            isVertical
              ? "w-full truncate text-center text-xs font-medium text-foreground"
              : "truncate text-sm font-medium text-foreground"
          }
        >
          {app.title}
        </p>
      </button>

      {footer ? <div className="mt-2">{footer}</div> : null}
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}
