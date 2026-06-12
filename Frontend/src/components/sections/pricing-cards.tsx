"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, ArrowRight, Zap } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { formationPackages, money } from "@/lib/utils";

const popularState = "Wyoming";

const extraFeatures: Record<string, string[]> = {
  Texas: ["No state income tax", "Business-friendly courts", "Large market access", "Strong tech ecosystem"],
  "New York": ["Global business prestige", "Financial hub access", "Robust legal framework", "International recognition"],
  Florida: ["No state income tax", "Growing startup scene", "Strategic location", "Tourism & commerce hub"],
  Wyoming: ["Strongest privacy laws", "No state income tax", "No annual report fee", "Lowest maintenance cost"]
};

export function PricingCards() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {formationPackages.map((item) => {
        const isPopular = item.state === popularState;
        const isExpanded = expanded === item.state;

        return (
          <motion.div
            key={item.state}
            layout
            className={`relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
              isPopular
                ? "border-brand-red shadow-red bg-white dark:bg-white/5"
                : "border-brand-light-gray bg-white shadow-card hover:border-brand-red/40 hover:shadow-soft dark:border-white/10 dark:bg-white/5"
            }`}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
          >
            {/* Popular badge */}
            {isPopular && (
              <div className="flex items-center justify-center gap-1.5 bg-brand-red py-1.5 text-xs font-semibold text-white">
                <Zap className="size-3" />
                Most Popular — Best Value
              </div>
            )}

            <div className="flex flex-1 flex-col p-6">
              {/* Header */}
              <div className="mb-5">
                <div className="mb-1 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-brand-black dark:text-white">{item.state}</h3>
                  {isPopular && (
                    <span className="rounded-full bg-brand-red/10 px-2 py-0.5 text-xs font-medium text-brand-red">
                      #1 Pick
                    </span>
                  )}
                </div>
                <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{item.timeline}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black tracking-tight text-brand-black dark:text-white" style={{ letterSpacing: "-0.03em" }}>
                    {money(item.price)}
                  </span>
                  <span className="mb-1 text-sm text-brand-dark-gray/50 dark:text-white/40">one-time</span>
                </div>
                <p className="mt-1 text-xs text-brand-dark-gray/40 dark:text-white/30">All fees included</p>
              </div>

              {/* Core features */}
              <div className="mb-5 grid gap-2.5 text-sm">
                {item.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-red" />
                    <span className="text-brand-dark-gray/70 dark:text-white/60">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Expandable extra features */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="mb-5 overflow-hidden"
                  >
                    <div className="grid gap-2 border-t border-brand-light-gray pt-4 dark:border-white/10">
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/40 dark:text-white/30">State advantages</p>
                      {extraFeatures[item.state].map((feat) => (
                        <div key={feat} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                          <span className="text-brand-dark-gray/70 dark:text-white/60">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Expand toggle */}
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : item.state)}
                className="mb-5 flex items-center gap-1 text-xs font-medium text-brand-dark-gray/50 hover:text-brand-red transition-colors dark:text-white/40 dark:hover:text-brand-red"
              >
                <ChevronDown className={`size-3.5 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                {isExpanded ? "Show less" : "Show state advantages"}
              </button>

              {/* CTA */}
              <ButtonLink
                href={`/register-company?state=${item.slug}`}
                variant={isPopular ? "primary" : "outline"}
                className="mt-auto w-full"
              >
                Register {item.state} LLC
                <ArrowRight className="size-3.5" />
              </ButtonLink>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
