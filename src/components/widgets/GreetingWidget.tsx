import { useAppContext } from "@/hooks/useAppContext";
import { Card } from "./Card";
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
          <h1 className="text-xl font-bold tracking-tight">{getGreeting()},</h1>
          <p className="text-right text-sm font-semibold tracking-tight text-primary/50">
            karretOS
          </p>
        </div>
        <h2 className="text-lg font-semibold opacity-50">{username}</h2>
      </div>
    </Card>
  );
};
