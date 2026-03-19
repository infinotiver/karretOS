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
      <h1 className="text-xl font-bold tracking-tight">
        {getGreeting()},
      </h1>
      <h2 className="text-lg font-semibold opacity-50">
        {username}
      </h2>
    </Card>
  );
};
