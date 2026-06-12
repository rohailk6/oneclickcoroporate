import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "flat" | "dark" | "red";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
}

const variants: Record<CardVariant, string> = {
  default: "border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5",
  elevated: "border border-brand-light-gray bg-white shadow-soft dark:border-white/10 dark:bg-white/5",
  flat: "border border-brand-light-gray bg-white dark:border-white/10 dark:bg-white/5",
  dark: "bg-brand-dark-gray text-white border border-white/10",
  red: "bg-brand-red text-white border border-brand-red-dark shadow-red"
};

export function Card({ className, variant = "default", hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        variants[variant],
        hover && "transition-all duration-300 hover:-translate-y-1 hover:shadow-soft cursor-pointer",
        className
      )}
      {...props}
    />
  );
}
