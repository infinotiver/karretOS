import { GithubLogoIcon } from "@phosphor-icons/react";

export default function TopBar() {
  return (
    <div className="sticky top-0 left-0 right-0 bg-background/80 shadow-md z-100 h-8 flex items-center px-6 text-sm">
      <span className="font-bold text-foreground">KarretOS</span>
      <div className="flex-1" />
      <div className="flex items-center gap-3 text-muted-foreground">
        <a href="https://github.com/infinotiver/karretos">
          <GithubLogoIcon />
        </a>
      </div>
    </div>
  );
}
