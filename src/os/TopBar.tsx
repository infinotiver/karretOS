import { GithubLogoIcon } from "@phosphor-icons/react";
import { useTime } from "@/hooks/useTime";
export default function TopBar() {
  const { minutes, hours, formattedDate } = useTime({});
  return (
    <div className="fixed top-0 left-0 right-0 z-1000 h-8 bg-background/80 backdrop-blur-xl shadow-md flex items-center px-6 text-sm rounded-b-lg">
      <span className="font-bold text-foreground">KarretOS</span>
      <div className="flex-1" />
      <div className="flex items-center gap-4 text-muted-foreground">
        <span className="flex items-center gap-2 h-8">
          <span className="text-foreground flex items-center h-full">
            {formattedDate} {hours}:{minutes.toString().padStart(2, "0")}
          </span>
        </span>
        <a
          href="https://github.com/infinotiver/karretos"
          title="GitHub"
          className="flex items-center h-8"
        >
          <GithubLogoIcon size={16} />
        </a>
      </div>
    </div>
  );
}
