import { useState } from "react";
import { PaletteIcon, UserCircleIcon, GaugeIcon, TestTubeIcon } from "@phosphor-icons/react";
import { PersonalisationSettings } from "@/components/settings/PersonalisationSettings";
import { AboutSettings } from "@/components/settings/AboutSettings";
import {ExperimentalSettings} from "@/components/settings/ExperimentalSettings";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import { SidebarNav } from "@/components/common/SidebarNav";

const SETTINGS = [
  {
    icon: PaletteIcon,
    title: "Personalisation",
    description: "Choose how the desktop looks",
  },
  {
    icon: GaugeIcon,
    title: "Performance",
    description: "Performance and optimization",
  },
  { icon: UserCircleIcon, title: "About", description: "Information about karretOS" },
  {
    icon: TestTubeIcon,
    title: "Experimental",
    description: "Try out new and in-development features",
  },
];
const SIDEBAR_ITEMS = SETTINGS.map((item) => ({
  id: item.title,
  label: item.title,
  icon: item.icon,
}));

export default function SettingsApp() {
  const [active, setActive] = useState(SETTINGS[0].title);
  const current = SETTINGS.find((s) => s.title === active)!;
  const CurrentIcon = current.icon;

  return (
    <WindowLayout footer="karretOS - made with love by infinotiver">
      <div className="flex h-full">
        <SidebarNav
          title="Settings"
          items={SIDEBAR_ITEMS}
          activeId={active}
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
          {active === "Experimental" && <ExperimentalSettings />}
        </section>
      </div>
    </WindowLayout>
  );
}
