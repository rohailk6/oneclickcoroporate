import { NextResponse } from "next/server";
import { formationPackages } from "@/lib/utils";

export function GET() {
  return NextResponse.json({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "OneClick Corporate",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
    offers: formationPackages.map((item) => ({
      "@type": "Offer",
      name: `${item.state} LLC Formation`,
      price: item.price,
      priceCurrency: "USD"
    }))
  });
}
