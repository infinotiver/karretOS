import { useState } from "react";
import { Wrench, Braces, Fingerprint } from "lucide-react";
import JsonFormatterTool from "./tools/json/JsonFormatterTool";
import HashGenerator from "./tools/json/HashGenerator";
import { SidebarNav } from "@/components/common/SidebarNav";

const TOOLS = [
  {
    id: "json-formatter",
    icon: Braces,
    label: "JSON Formatter",
    component: JsonFormatterTool,
  },
  {
    id: "hash-generator",
    icon: Fingerprint,
    label: "Hash Generator",
    component: HashGenerator,
  },
];
const SIDEBAR_ITEMS = TOOLS.map((tool) => ({
  id: tool.id,
  label: tool.label,
  icon: tool.icon,
}));

export default function DevToolsApp() {
  const [active, setActive] = useState(TOOLS[0].id);
  const toolObj = TOOLS.find((t) => t.id === active);
  const ActiveTool = toolObj?.component;

  return (
    <div className="flex h-full">
      <SidebarNav
        title="DevTools"
        titleIcon={Wrench}
        items={SIDEBAR_ITEMS}
        activeId={active}
        onSelect={setActive}
      />
      <main className="flex-1 p-6 overflow-auto border-l border-border/40">
        {ActiveTool ? <ActiveTool /> : null}
      </main>
    </div>
  );
}
