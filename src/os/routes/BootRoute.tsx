import { useNavigate } from "react-router-dom";
import { BootScreen } from "@/os/BootScreen";

interface BootRouteProps {
  onBootComplete: () => void;
}

export const BootRoute = ({ onBootComplete }: BootRouteProps) => {
  const navigate = useNavigate();
  const handleBootComplete = () => {
    onBootComplete();
    navigate("/locked", { replace: true });
  };

  return <BootScreen onBootComplete={handleBootComplete} />;
};
