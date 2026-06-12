import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoVariant = "default" | "compact" | "light" | "dark";
type LogoSize = "sm" | "md" | "lg" | "xl";

interface LogoProps {
  variant?: LogoVariant;
  size?: LogoSize;
  href?: string;
  className?: string;
  asLink?: boolean;
}

const sizeMap = {
  sm:  "h-8",
  md:  "h-10",
  lg:  "h-14",
  xl:  "h-20",
};

function LogoImage({ size = "md", variant = "default", className }: Pick<LogoProps, "size" | "variant" | "className">) {
  const heightCls = sizeMap[size];
  const isOnDark = variant === "light";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        isOnDark && "rounded-xl bg-white px-3 py-1",
        className
      )}
    >
      <img
        src="/images/logo.jpeg"
        alt="OneClick Corporate"
        className={cn("w-auto object-contain", heightCls)}
      />
    </span>
  );
}

export function Logo({ variant = "default", size = "md", href = "/", className, asLink = true }: LogoProps) {
  const content = <LogoImage size={size} variant={variant} className={className} />;

  if (!asLink) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg"
    >
      {content}
    </Link>
  );
}

export function LogoCompact({ variant = "default", size = "sm", href = "/", className }: LogoProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg",
        className
      )}
    >
      <LogoImage size={size} variant={variant} />
    </Link>
  );
}

export function LogoFavicon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-red overflow-hidden">
      <img src="/images/logo.jpeg" alt="OC" className="h-full w-full object-contain scale-150" />
    </div>
  );
}
