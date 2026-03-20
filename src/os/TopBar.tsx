import { GithubLogoIcon } from "@phosphor-icons/react";

export default function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-1000 h-8 bg-background/80 backdrop-blur-sm  shadow-md flex items-center px-6 text-sm">
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
