import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./globals.css";
import { BootRoute } from "@/os/routes/BootRoute";
import { LockScreen } from "@/os/LockScreen";
import Shell from "@/os/Shell";
import { AppProvider } from "@/providers/AppProvider";

const App = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/boot"
            element={
              <BootRoute
                onBootComplete={() => {
                  setBootComplete(true);
                  setUnlocked(false);
                }}
              />
            }
          />
          <Route
            path="/locked"
            element={<LockScreen onUnlock={() => setUnlocked(true)} />}
          />
          <Route
            path="/"
            element={
              !bootComplete ? (
                <Navigate to="/boot" replace />
              ) : !unlocked ? (
                <Navigate to="/locked" replace />
              ) : (
                <Shell />
              )
            }
          />
          <Route path="*" element={<Navigate to="/boot" replace />} />
        </Routes>
      </AnimatePresence>
    </AppProvider>
  );
};

export default App;
