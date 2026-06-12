import { CheckCircle2, Circle, Loader2 } from "lucide-react";

const stages = [
  { label: "Submitted", description: "Application received and logged" },
  { label: "In Review", description: "Team reviewing your documents" },
  { label: "Filing In Progress", description: "State filing underway" },
  { label: "Completed", description: "LLC formation complete" }
];

export function StatusTimeline({ active = 0 }: { active?: number }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-4 h-[calc(100%-2rem)] w-0.5 bg-brand-light-gray dark:bg-white/10" />
      <div
        className="absolute left-4 top-4 w-0.5 bg-brand-red transition-all duration-700"
        style={{ height: `${Math.min(100, (active / (stages.length - 1)) * 100)}%` }}
      />
      <div className="grid gap-6">
        {stages.map((stage, index) => {
          const done = index < active;
          const current = index === active;
          return (
            <div key={stage.label} className="relative flex items-start gap-4 pl-10">
              <div className={`absolute left-0 flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                done
                  ? "border-brand-red bg-brand-red text-white"
                  : current
                  ? "border-brand-red bg-white text-brand-red shadow-red dark:bg-brand-dark-gray"
                  : "border-brand-light-gray bg-white text-brand-dark-gray/30 dark:border-white/15 dark:bg-white/5"
              }`}>
                {done ? (
                  <CheckCircle2 className="size-4" />
                ) : current ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Circle className="size-4" />
                )}
              </div>
              <div>
                <p className={`text-sm font-semibold ${current ? "text-brand-red" : done ? "text-brand-black dark:text-white" : "text-brand-dark-gray/40 dark:text-white/30"}`}>
                  {stage.label}
                </p>
                <p className="text-xs text-brand-dark-gray/50 dark:text-white/30">{stage.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
