"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import {
  ArrowLeft, ArrowRight, CheckCircle2, CreditCard, Building2,
  MapPin, ClipboardCheck, Sparkles, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Button, ButtonLink } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { formationPackages, money } from "@/lib/utils";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

/* ── Schema (no auth fields — user is already logged in) ── */
const schema = z.object({
  country: z.string().min(2, "Country is required"),
  businessPurpose: z.string().min(5, "Describe your business purpose"),
  companyName: z.string().min(2, "Company name is required"),
  entityType: z.literal("LLC"),
  selectedState: z.enum(["Texas", "New York", "Florida", "Wyoming"]),
  industry: z.string().min(2, "Industry is required"),
  notes: z.string().optional()
});

const stepSchemas = {
  1: schema.pick({ country: true, businessPurpose: true }),
  2: schema.pick({ companyName: true, entityType: true, selectedState: true, industry: true }),
  3: z.object({}),
  4: z.object({}),
  5: z.object({}),
  6: z.object({})
};

type FormState = z.infer<typeof schema>;

const initialState: FormState = {
  country: "", businessPurpose: "", companyName: "", entityType: "LLC",
  selectedState: "Wyoming", industry: "", notes: ""
};

const stateToEnum: Record<string, string> = {
  "Texas": "TEXAS", "New York": "NEW_YORK", "Florida": "FLORIDA", "Wyoming": "WYOMING"
};

const steps = [
  { number: 1, label: "About", icon: FileText },
  { number: 2, label: "Company", icon: Building2 },
  { number: 3, label: "State", icon: MapPin },
  { number: 4, label: "Review", icon: ClipboardCheck },
  { number: 5, label: "Payment", icon: CreditCard },
  { number: 6, label: "Success", icon: Sparkles }
];

const countries = [
  "United Arab Emirates", "India", "Pakistan", "United Kingdom", "United States",
  "Canada", "Australia", "Germany", "France", "Mexico", "Brazil", "Nigeria",
  "Saudi Arabia", "Egypt", "Turkey", "South Korea", "Japan", "Philippines", "Other"
];

const industries = [
  "Technology / SaaS", "E-commerce / Retail", "Consulting / Freelance",
  "Finance / Fintech", "Healthcare", "Real Estate", "Education",
  "Media / Content", "Manufacturing", "Logistics", "Other"
];

/* ── Component ── */
export function CompanyRegistrationForm() {
  const { user, token } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const saved = window.localStorage.getItem("oneclick-registration");
    if (saved) {
      try { setForm({ ...initialState, ...JSON.parse(saved) }); } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("oneclick-registration", JSON.stringify(form));
  }, [form]);

  const selectedPackage = useMemo(
    () => formationPackages.find((item) => item.state === form.selectedState) ?? formationPackages[3],
    [form.selectedState]
  );

  function update<K extends keyof FormState>(name: K, value: FormState[K]) {
    setForm((cur) => ({ ...cur, [name]: value }));
    setErrors((cur) => ({ ...cur, [name]: "" }));
  }

  function validate(currentStep: number) {
    const result = stepSchemas[currentStep as keyof typeof stepSchemas].safeParse(form);
    if (result.success) return true;
    const errs = Object.fromEntries(result.error.issues.map((i) => [i.path[0] as string, i.message]));
    setErrors(errs);
    toast.error("Please fix the highlighted fields.");
    return false;
  }

  function goNext() {
    if (!validate(step)) return;
    setDirection(1);
    setStep((cur) => Math.min(6, cur + 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((cur) => Math.max(1, cur - 1));
  }

  async function submitPayment() {
    setSubmitting(true);
    try {
      await api("/applications", {
        method: "POST",
        token: token ?? undefined,
        body: JSON.stringify({
          companyName: form.companyName,
          selectedState: stateToEnum[form.selectedState] ?? form.selectedState.toUpperCase(),
          entityType: "LLC",
          industry: form.industry,
          businessPurpose: form.businessPurpose,
          notes: form.notes
        })
      });

      window.localStorage.removeItem("oneclick-registration");
      setDirection(1);
      setStep(6);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progress = ((step - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Step indicator */}
      <div className="mb-8">
        <div className="mb-5 flex items-center justify-between">
          {steps.map(({ number, label, icon: Icon }) => {
            const done = number < step;
            const active = number === step;
            return (
              <div key={number} className="flex flex-col items-center gap-1.5">
                <div className={`flex size-9 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  done ? "border-brand-red bg-brand-red text-white"
                    : active ? "border-brand-red bg-white text-brand-red shadow-red dark:bg-brand-dark-gray"
                    : "border-brand-light-gray bg-white text-brand-dark-gray/30 dark:border-white/15 dark:bg-white/5 dark:text-white/20"
                }`}>
                  {done ? <CheckCircle2 className="size-4" /> : <Icon className="size-4" />}
                </div>
                <span className={`hidden text-xs font-medium sm:block ${active ? "text-brand-red" : done ? "text-brand-dark-gray dark:text-white" : "text-brand-dark-gray/30 dark:text-white/20"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-brand-light-gray dark:bg-white/10">
          <motion.div className="h-full rounded-full bg-brand-red" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
        <p className="mt-2 text-right text-xs text-brand-dark-gray/40 dark:text-white/30">Step {step} of {steps.length}</p>
      </div>

      {/* Form card */}
      <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-card dark:border-white/10 dark:bg-white/5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="p-7 sm:p-10"
          >
            {/* STEP 1: About your business */}
            {step === 1 && (
              <div className="grid gap-6">
                <div>
                  <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                    Welcome, {user?.fullName?.split(" ")[0]}!
                  </h1>
                  <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Tell us about your business so we can tailor your LLC formation.</p>
                </div>
                <Field label="Country of Residence" error={errors.country}>
                  <Select value={form.country} onChange={(e) => update("country", e.target.value)}>
                    <option value="">Select your country…</option>
                    {countries.map((c) => <option key={c}>{c}</option>)}
                  </Select>
                </Field>
                <Field label="Business Purpose" error={errors.businessPurpose}>
                  <Textarea placeholder="Describe what your company will do, your products or services…" value={form.businessPurpose} onChange={(e) => update("businessPurpose", e.target.value)} />
                </Field>
              </div>
            )}

            {/* STEP 2: Company Info */}
            {step === 2 && (
              <div className="grid gap-6">
                <div>
                  <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Company Details</h1>
                  <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Provide details about the company you want to form.</p>
                </div>
                <Field label="Company Name" error={errors.companyName}>
                  <Input placeholder="Atlas Ledger LLC" value={form.companyName} onChange={(e) => update("companyName", e.target.value)} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Entity Type">
                    <Input value="LLC (Limited Liability Company)" readOnly className="cursor-default bg-brand-off-white dark:bg-white/5" />
                  </Field>
                  <Field label="Industry" error={errors.industry}>
                    <Select value={form.industry} onChange={(e) => update("industry", e.target.value)}>
                      <option value="">Select industry…</option>
                      {industries.map((ind) => <option key={ind}>{ind}</option>)}
                    </Select>
                  </Field>
                </div>
                <Field label="Additional Notes (optional)">
                  <Textarea placeholder="Any specific requirements, preferred registered agent, or questions for our team…" value={form.notes} onChange={(e) => update("notes", e.target.value)} />
                </Field>
              </div>
            )}

            {/* STEP 3: State Selection */}
            {step === 3 && (
              <div className="grid gap-6">
                <div>
                  <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Choose Your State</h1>
                  <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Select the state where you want to form your LLC.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {formationPackages.map((pkg) => (
                    <button key={pkg.state} type="button"
                      onClick={() => update("selectedState", pkg.state as FormState["selectedState"])}
                      className={`relative flex flex-col rounded-xl border-2 p-5 text-left transition-all duration-200 ${
                        form.selectedState === pkg.state
                          ? "border-brand-red bg-brand-red/5 dark:bg-brand-red/10"
                          : "border-brand-light-gray hover:border-brand-red/40 dark:border-white/15 dark:hover:border-brand-red/40"
                      }`}>
                      {pkg.state === "Wyoming" && (
                        <span className="absolute right-3 top-3 rounded-full bg-brand-red px-2 py-0.5 text-xs font-semibold text-white">Popular</span>
                      )}
                      <p className={`text-lg font-bold ${form.selectedState === pkg.state ? "text-brand-red" : "text-brand-black dark:text-white"}`}>{pkg.state}</p>
                      <p className="mt-1 text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.03em" }}>{money(pkg.price)}</p>
                      <p className="mt-1 text-xs text-brand-dark-gray/50 dark:text-white/40">{pkg.timeline}</p>
                    </button>
                  ))}
                </div>
                <div className="rounded-xl bg-brand-off-white p-4 text-sm text-brand-dark-gray/60 dark:bg-white/5 dark:text-white/40">
                  <strong className="text-brand-dark-gray dark:text-white/80">Not sure which state?</strong> Wyoming is recommended for most international founders — lowest cost, strongest privacy, no annual report fee.
                </div>
              </div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && (
              <div className="grid gap-6">
                <div>
                  <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Review Your Application</h1>
                  <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Please confirm all details before proceeding to payment.</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Summary label="Full Name" value={user?.fullName ?? ""} />
                  <Summary label="Email" value={user?.email ?? ""} />
                  <Summary label="Country" value={form.country} />
                  <Summary label="Company Name" value={form.companyName} />
                  <Summary label="Entity Type" value="LLC" />
                  <Summary label="State" value={form.selectedState} />
                  <Summary label="Industry" value={form.industry} />
                </div>
                {form.businessPurpose && (
                  <div className="rounded-xl border border-brand-light-gray p-4 dark:border-white/10">
                    <p className="mb-1 text-xs uppercase tracking-wider text-brand-dark-gray/40 dark:text-white/30">Business Purpose</p>
                    <p className="text-sm text-brand-dark-gray dark:text-white/80">{form.businessPurpose}</p>
                  </div>
                )}
                <div className="flex items-center justify-between rounded-xl border-2 border-brand-red/30 bg-brand-red/5 p-5 dark:bg-brand-red/10">
                  <div>
                    <p className="font-bold text-brand-black dark:text-white">{form.selectedState} LLC Formation</p>
                    <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{selectedPackage.timeline}</p>
                  </div>
                  <p className="text-2xl font-black text-brand-red" style={{ letterSpacing: "-0.03em" }}>{money(selectedPackage.price)}</p>
                </div>
              </div>
            )}

            {/* STEP 5: Payment */}
            {step === 5 && (
              <div className="grid gap-6">
                <div>
                  <h1 className="text-2xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Secure Payment</h1>
                  <p className="mt-1 text-sm text-brand-dark-gray/50 dark:text-white/40">Complete your purchase to begin the formation process.</p>
                </div>
                <div className="rounded-xl border border-brand-light-gray bg-brand-off-white p-5 dark:border-white/10 dark:bg-white/5">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/30">Order Summary</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-brand-black dark:text-white">{form.selectedState} LLC Formation</p>
                      <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">All inclusive — no hidden fees</p>
                    </div>
                    <p className="text-2xl font-black text-brand-black dark:text-white">{money(selectedPackage.price)}</p>
                  </div>
                  <hr className="my-4 border-brand-light-gray dark:border-white/10" />
                  {selectedPackage.features.map((f) => (
                    <div key={f} className="mb-2 flex items-center gap-2 text-sm text-brand-dark-gray/60 dark:text-white/50">
                      <CheckCircle2 className="size-3.5 shrink-0 text-brand-red" />{f}
                    </div>
                  ))}
                </div>
                <div className="rounded-xl border border-brand-light-gray p-5 dark:border-white/10">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/30">Payment Details</p>
                  <div className="grid gap-4">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Card Number</label>
                      <Input placeholder="4242 4242 4242 4242" className="font-mono" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Expiry</label>
                        <Input placeholder="MM / YY" className="font-mono" />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">CVC</label>
                        <Input placeholder="•••" className="font-mono" />
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-brand-dark-gray/40 dark:text-white/30">
                    <CheckCircle2 className="size-3.5 text-brand-red" />
                    256-bit SSL encrypted — your data is secure
                  </p>
                </div>
                <Button onClick={submitPayment} loading={submitting} className="w-full" size="lg">
                  {submitting ? "Processing…" : `Pay ${money(selectedPackage.price)} — Start Formation`}
                </Button>
              </div>
            )}

            {/* STEP 6: Success */}
            {step === 6 && (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-brand-red/10">
                  <CheckCircle2 className="size-10 text-brand-red" />
                </div>
                <h1 className="text-3xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>
                  You&apos;re all set!
                </h1>
                <p className="mx-auto mt-3 max-w-md text-brand-dark-gray/60 dark:text-white/50">
                  Your <strong className="text-brand-black dark:text-white">{form.selectedState} LLC application</strong> has been received. Our team will begin processing within 1 business day.
                </p>
                <div className="mt-8 w-full max-w-sm rounded-xl border border-brand-light-gray p-5 text-left dark:border-white/10">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-dark-gray/50 dark:text-white/30">What happens next</p>
                  {[
                    "You'll receive a confirmation email within minutes",
                    "Our team begins formation within 1 business day",
                    "Track every status update in your dashboard",
                    "Download completed documents from your vault"
                  ].map((item, i) => (
                    <div key={item} className="mb-3 flex items-start gap-3 text-sm">
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-red/10 text-xs font-bold text-brand-red">{i + 1}</span>
                      <span className="text-brand-dark-gray/70 dark:text-white/60">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/dashboard">Go to Dashboard</ButtonLink>
                  <ButtonLink href="/" variant="outline">Back to Home</ButtonLink>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        {step < 6 && (
          <div className="flex items-center justify-between border-t border-brand-light-gray bg-brand-off-white px-7 py-4 dark:border-white/10 dark:bg-white/5">
            <Button variant="outline" disabled={step === 1} onClick={goBack}>
              <ArrowLeft className="size-4" /> Back
            </Button>
            {step === 5 ? null : (
              <Button onClick={goNext}>
                {step === 4 ? "Proceed to Payment" : "Continue"}
                <ArrowRight className="size-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-brand-dark-gray dark:text-white/80">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-brand-light-gray p-4 dark:border-white/10">
      <p className="text-xs uppercase tracking-wider text-brand-dark-gray/40 dark:text-white/30">{label}</p>
      <p className="mt-1 font-semibold text-brand-black dark:text-white">{value || "—"}</p>
    </div>
  );
}
