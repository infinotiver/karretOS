import { useState } from "react";
import { SettingsList } from "@/components/settings/SettingsList";
import { TransparencySettings } from "@/components/settings/TransparencySettings";
import { AboutSettings } from "@/components/settings/AboutSettings";
import { WindowLayout } from "@/components/layouts/WindowLayout";

const SETTINGS = [
  {
    icon: "🎨",
    title: "Transparency",
    description: "Configure background opacity",
  },
  { icon: "👤", title: "About", description: "About karretOS & You" },
];

export default function SettingsApp() {
  const [active, setActive] = useState(SETTINGS[0].title);
  const current = SETTINGS.find((s) => s.title === active)!;

  return (
    <WindowLayout footer="karretOS - made with love by infinotiver">
      <div className="flex h-full">
        <SettingsList
          settings={SETTINGS}
          active={active}
          onSelect={setActive}
        />

        <section className="flex-1 p-6 overflow-auto border-l border-border/40">
          <h1 className="text-xl font-semibold mb-1 text-foreground">
            {current.icon} {current.title}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {current.description}
          </p>

          {active === "Transparency" && <TransparencySettings />}
          {active === "About" && <AboutSettings />}
        </section>
      </div>
    </WindowLayout>
  );
}
