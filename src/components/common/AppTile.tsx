import type { ReactNode, ComponentType, KeyboardEvent } from "react";

type TileApp = {
  id: string;
  title: string;
  description?: string;
  icon: ComponentType<{ className?: string }>;
};

interface AppTileProps {
  app: TileApp;
  selected?: boolean;
  layout?: "vertical" | "horizontal";
  title?: string;
  description?: string;
  showDescription?: boolean;
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
  description,
  showDescription = true,
  onSelect,
  onOpen,
  footer,
  action,
}: AppTileProps) {
  const Icon = app.icon;
  const resolvedTitle = title ?? app.title;
  const resolvedDescription = description ?? app.description;

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") onOpen?.();
    if (e.key === " ") {
      e.preventDefault();
      onSelect?.();
    }
  };

  const isVertical = layout === "vertical";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onKeyDown={onKeyDown}
      title={resolvedTitle}
      className={`h-full rounded-lg border p-2 cursor-pointer transition-colors duration-200 ${
        selected
          ? "border-primary/40 bg-primary/5"
          : "border-border/40 bg-background/40 hover:border-border hover:bg-background/55"
      }`}
    >
      <div
        className={
          isVertical
            ? "flex h-full w-full flex-col"
            : "flex h-full w-full flex-col"
        }
      >
        <div
          className={
            isVertical
              ? "flex w-full flex-1 flex-col items-center gap-2"
              : "flex w-full flex-1 items-center gap-2 text-left"
          }
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
            {resolvedTitle}
          </p>

          {showDescription && resolvedDescription ? (
            <p
              className={
                isVertical
                  ? "w-full line-clamp-2 text-center text-xs text-muted-foreground"
                  : "line-clamp-2 text-xs text-muted-foreground"
              }
            >
              {resolvedDescription}
            </p>
          ) : null}
        </div>

        {(footer || action) && (
          <div className="mt-2" onClick={(e) => e.stopPropagation()}>
            {footer ? <div>{footer}</div> : null}
            {action ? (
              <div className={footer ? "mt-2" : ""}>{action}</div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
