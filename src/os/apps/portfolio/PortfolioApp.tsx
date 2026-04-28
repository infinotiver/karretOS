import Hero from "@/components/portfolio/hero/hero";
import { Badge } from "@/components/common/Badge";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
const PortfolioApp = () => {
  return (
    <WindowLayout>
      <main className="h-full flex flex-col space-y-8 p-6 overflow-y-auto">
        {/* ── hero + about ── */}
        <div className="grid gap-4">
          <section className="space-y-4">
            <Hero />
          </section>
        </div>

        {/* ── projects ── */}
        <section className="space-y-3">
          <h2 className="text-2xl font-black tracking-tight">Projects</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "SlangType",
                desc: "Test your typing speed in slangs and custom themes (using AI)",
                href: "https://slangtype.vercel.app/",
                tags: ["React", "NeonDB"],
              },
              {
                title: "karretOS",
                desc: "webOS Portfolio built with React & Tailwind",
                href: "https://karretos.vercel.app/",
                tags: ["React", "Tailwind"],
              },
              {
                title: "Mind Sink",
                desc: "An ad-free focused image organizer with no infinite scroll.",
                href: "https://mind-sink-6llu.onrender.com/",
                tags: ["React", "MongoDB", "Discord Auth"],
              },
              {
                title: "Emergency Numbers Lookup",
                desc: "A simple utility to get emergency numbers based on your location.",
                href: "https://infinotiver.is-a.dev/emergency-numbers/",
                tags: ["Tailwind", "Node.js"],
              },
              {
                title: "Memento Mori VSC Extension",
                desc: "A VSCode extension that visualizes times and dates in your statusbar",
                href: "https://github.com/infinotiver/memento-mori-status",
                tags: ["VS Code", "Typescript"],
              },
              {
                title: "Aesthetic Pomodoro",
                desc: "A minimalist pomodoro timer with a focus on aesthetics and glassmorphism",
                href: "http://infinotiver.is-a.dev/aesthetic-pomodoro/",
                tags: ["Tailwind", "HTML"],
              },
            ].map(({ title, desc, href, tags }) => (
              <a
                key={title}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </span>
                  <ArrowSquareOutIcon />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-muted/60 text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
    </WindowLayout>
  );
};

export default PortfolioApp;
