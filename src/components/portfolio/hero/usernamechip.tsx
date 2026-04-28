import React, { useState } from "react";
import logo_new from "@/assets/assets/logo_new.png";
import logo from "@/assets/assets/logo.png";

type ChipIdentity = {
  id: string;
  label: string;
  accent: string;
  src?: string;
  initials: string;
};

const identities: ChipIdentity[] = [
  {
    id: "infinotiver",
    label: "@infinotiver",
    accent: "#3b82f6",
    src: logo_new,
    initials: "I",
  },
  {
    id: "karret",
    label: "@karret",
    accent: "#f97316",
    src: logo,
    initials: "K",
  },
];

const UsernameChip: React.FC = () => {
  const [activeId, setActiveId] = useState(identities[0].id);
  const activeIdentity =
    identities.find((i) => i.id === activeId) ?? identities[0];

  return (
    <div
      className="inline-flex items-center rounded-full border-4 pr-2 pl-0.5 py-1"
      style={{ borderColor: `${activeIdentity.accent}70` }}
      onMouseLeave={() => setActiveId(identities[0].id)}
    >
      <div className="flex items-center">
        {identities.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId(identities[0].id)}
            onFocus={() => setActiveId(item.id)}
            onBlur={() => setActiveId(identities[0].id)}
            aria-label={item.label}
            className={`${idx === 0 ? "" : "-ml-3"} relative rounded-full border bg-background p-0.5`}
            style={
              activeId === item.id ? { borderColor: item.accent } : undefined
            }
          >
            {item.src ? (
              <img
                src={item.src}
                alt={item.label}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-xs font-bold">
                {item.initials}
              </span>
            )}
          </button>
        ))}
      </div>

      <span className="ml-3 text-sm font-bold uppercase text-foreground">
        @Infinotiver
      </span>
    </div>
  );
};

export default UsernameChip;
