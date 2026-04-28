import UsernameChip from "./usernamechip";
import QuickHubActions from "./quickhubactions";

export default function Hero() {
  return (
    <section className="space-y-4 text-left">
      <UsernameChip />
      <h2 className="text-2xl font-bold md:text-3xl">
        Student by day, developer by choice
      </h2>
      <p className="text-xs text-muted-foreground md:text-sm">
        Coding has been my obsession since I was 11 years old. Today, I’m a
        student developer on a mission to master the full stack. While I’m
        already comfortable with Python and JavaScript, discovering the power of
        React and Tailwind was a total game-changer for me. I’m currently
        focused on building tools that make the internet a better place,
        skillfully balancing my passion for development with my academic life.
      </p>

      <QuickHubActions />
    </section>
  );
}
