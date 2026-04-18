import { useAppContext } from "@/hooks/useAppContext";
import { Card } from "./Card";
import { CarrotIcon } from "lucide-react";
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

export const Greeting = () => {
  const { username } = useAppContext();
  return (
    <Card>
      <div className="space-y-0.5">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">
            {getGreeting()},
          </h1>
          <p className="inline-flex items-center gap-1.5 text-right text-lg font-semibold tracking-tight text-primary/60">
            <span>karretOS</span>
            <CarrotIcon className="h-4 w-4" />
          </p>
        </div>
        <h2 className="text-lg font-semibold opacity-50">{username}</h2>
      </div>
    </Card>
  );
};
