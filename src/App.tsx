import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import "./globals.css";
import { BootScreen } from "@/os/BootScreen";
import Shell from "@/os/Shell";
import { AppProvider } from "@/providers/AppProvider";

const App = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        {!bootComplete ? (
          <BootScreen key="boot" onBootComplete={() => setBootComplete(true)} />
        ) : (
          <Shell key="shell" />
        )}
      </AnimatePresence>
    </AppProvider>
  );
};

export default App;
