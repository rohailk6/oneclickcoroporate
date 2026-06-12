import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const inputBase =
  "h-11 w-full rounded-lg border border-brand-light-gray bg-white px-3 text-sm text-brand-dark-gray placeholder:text-brand-dark-gray/40 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(inputBase, className)}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg border border-brand-light-gray bg-white px-3 py-3 text-sm text-brand-dark-gray placeholder:text-brand-dark-gray/40 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30",
        className
      )}
      {...props}
    />
  );
}

export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-lg border border-brand-light-gray bg-white px-3 text-sm text-brand-dark-gray transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/15 dark:bg-brand-dark-gray dark:text-white",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}
