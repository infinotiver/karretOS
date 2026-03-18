import { AnimatePresence } from "framer-motion";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./globals.css";
import { BootRoute } from "@/os/routes/BootRoute";
import { LockScreen } from "@/os/LockScreen";
import Shell from "@/os/Shell";
import { AppProvider } from "@/providers/AppProvider";

import { useState } from "react";

const App = () => {
  const [booted, setBooted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              !booted ? (
                <BootRoute onBootComplete={() => setBooted(true)} />
              ) : !unlocked ? (
                <LockScreen onUnlock={() => setUnlocked(true)} />
              ) : (
                <Navigate to="/desktop" replace />
              )
            }
          />
          <Route path="/desktop" element={<Shell />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AppProvider>
  );
};

export default App;
