import { useNavigate } from "react-router-dom";
import { BootScreen } from "@/os/BootScreen";

// BootRoute is now just a passthrough to BootScreen
interface BootRouteProps {
  onBootComplete: () => void;
}

export const BootRoute = ({ onBootComplete }: BootRouteProps) => {
  return <BootScreen onBootComplete={onBootComplete} />;
};
