import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formationPackages = [
  {
    state: "Texas",
    price: 390,
    slug: "texas",
    timeline: "7-10 business days",
    features: ["Texas LLC filing package", "Name availability review", "Digital document vault", "Formation status tracking"]
  },
  {
    state: "New York",
    price: 340,
    slug: "new-york",
    timeline: "10-14 business days",
    features: ["New York LLC filing package", "Publication guidance", "Secure upload portal", "Formation status tracking"]
  },
  {
    state: "Florida",
    price: 320,
    slug: "florida",
    timeline: "5-8 business days",
    features: ["Florida LLC filing package", "Articles preparation", "Digital document vault", "Formation status tracking"]
  },
  {
    state: "Wyoming",
    price: 250,
    slug: "wyoming",
    timeline: "3-5 business days",
    features: ["Wyoming LLC filing package", "Privacy-minded setup", "Secure upload portal", "Formation status tracking"]
  }
] as const;

export type FormationPackage = (typeof formationPackages)[number];

export function money(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}
