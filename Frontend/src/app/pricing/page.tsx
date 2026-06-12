import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingCards } from "@/components/sections/pricing-cards";
import { AnimatedSection } from "@/components/sections/animated-section";

export const metadata = {
  title: "Pricing",
  description: "Fixed-price LLC formation packages for Texas, New York, Florida, and Wyoming."
};

const included = [
  "State filing fees included",
  "Name availability check",
  "Articles of Organization",
  "Registered agent (Year 1)",
  "Digital document vault",
  "Formation status tracking",
  "Email support",
  "Dashboard access"
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-white py-20 dark:bg-brand-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Pricing</p>
              <h1 className="text-5xl font-black tracking-tight text-brand-black dark:text-white sm:text-6xl" style={{ letterSpacing: "-0.03em" }}>
                One price. No surprises.
              </h1>
              <p className="mt-5 text-lg text-brand-dark-gray/60 dark:text-white/50">
                Choose your state and get started immediately. All formation fees, document filing, registered agent (Year 1), and your digital vault — included.
              </p>
            </AnimatedSection>

            {/* What's included */}
            <AnimatedSection delay={0.1} className="mb-12 rounded-2xl border border-brand-light-gray bg-brand-off-white p-6 dark:border-white/10 dark:bg-white/5">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Everything included in every plan</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {included.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-brand-dark-gray dark:text-white/70">
                    <CheckCircle2 className="size-4 shrink-0 text-brand-red" />
                    {item}
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <PricingCards />
            </AnimatedSection>
          </div>
        </section>

        {/* State comparison table */}
        <section className="bg-brand-off-white py-20 dark:bg-white/5">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-10">
              <h2 className="text-3xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>State comparison</h2>
              <p className="mt-2 text-brand-dark-gray/60 dark:text-white/50">Key differences between our supported formation states.</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-brand-light-gray bg-brand-off-white dark:border-white/10 dark:bg-white/5">
                        <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">Feature</th>
                        {["Wyoming", "Florida", "New York", "Texas"].map((s) => (
                          <th key={s} className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/40">
                            {s}
                            {s === "Wyoming" && <span className="ml-1 text-brand-red">★</span>}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-light-gray dark:divide-white/10">
                      {[
                        ["Price", "$250", "$320", "$340", "$390"],
                        ["Timeline", "3–5 days", "5–8 days", "10–14 days", "7–10 days"],
                        ["State income tax", "None", "None", "Yes", "None"],
                        ["Annual report", "Not required", "Required", "Required", "Required"],
                        ["Privacy", "Strongest", "Good", "Good", "Good"],
                        ["Maintenance cost", "Lowest", "Moderate", "High", "Moderate"]
                      ].map(([label, ...values]) => (
                        <tr key={label} className="hover:bg-brand-off-white/50 dark:hover:bg-white/3 transition-colors">
                          <td className="px-5 py-3.5 font-medium text-brand-black dark:text-white">{label}</td>
                          {values.map((v, i) => (
                            <td key={i} className={`px-5 py-3.5 text-center ${i === 0 ? "font-semibold text-brand-red" : "text-brand-dark-gray/70 dark:text-white/60"}`}>
                              {v}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
