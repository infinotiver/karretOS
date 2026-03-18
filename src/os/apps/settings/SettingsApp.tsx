import { useState } from "react";
import { Palette, User } from "lucide-react";
import { SettingsList } from "@/components/settings/SettingsList";
import { PersonalisationSettings } from "@/components/settings/PersonalisationSettings";
import { AboutSettings } from "@/components/settings/AboutSettings";
import { WindowLayout } from "@/components/layouts/WindowLayout";

const SETTINGS = [
  {
    icon: Palette,
    title: "Personalisation",
    description: "Choose how the desktop looks",
  },
  { icon: User, title: "About", description: "About karretOS & You" },
];

export default function SettingsApp() {
  const [active, setActive] = useState(SETTINGS[0].title);
  const current = SETTINGS.find((s) => s.title === active)!;
  const CurrentIcon = current.icon;

  return (
    <WindowLayout footer="karretOS - made with love by infinotiver">
      <div className="flex h-full">
        <SettingsList
          settings={SETTINGS}
          active={active}
          onSelect={setActive}
        />

        <section className="flex-1 p-6 overflow-auto border-l border-border/40">
          <h1 className="text-xl font-semibold mb-1 text-foreground flex items-center gap-2">
            <CurrentIcon className="size-5" aria-hidden="true" />
            <span>{current.title}</span>
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {current.description}
          </p>

          {active === "Personalisation" && <PersonalisationSettings />}
          {active === "About" && <AboutSettings />}
        </section>
      </div>
    </WindowLayout>
  );
}
