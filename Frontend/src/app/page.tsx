import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, BadgeCheck, CheckCircle2, Clock, FileCheck2, Globe2,
  LockKeyhole, MapPin, MessageSquare, Shield, Star, Users, Zap,
  TrendingUp, Award, HeadphonesIcon, ChevronDown
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { PricingCards } from "@/components/sections/pricing-cards";
import { AnimatedSection, StaggerItem } from "@/components/sections/animated-section";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

/* ──────── Data ──────── */
const stats = [
  { value: "2,400+", label: "Companies formed" },
  { value: "98%", label: "Success rate" },
  { value: "40+", label: "Countries served" },
  { value: "3 days", label: "Fastest filing (WY)" }
];

const steps = [
  {
    step: "01",
    title: "Choose Your State",
    body: "Select from Wyoming, Florida, New York, or Texas — each with transparent fixed pricing and clear timelines.",
    icon: MapPin
  },
  {
    step: "02",
    title: "Submit Your Details",
    body: "Complete a guided 6-step form with automatic progress saving, real-time validation, and mobile support.",
    icon: FileCheck2
  },
  {
    step: "03",
    title: "We File For You",
    body: "Our team handles all filings. Track every status update in real time from your personalized dashboard.",
    icon: TrendingUp
  }
];

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Shield, title: "Bank-grade security", body: "All documents and data encrypted with enterprise-level protection." },
  { icon: Zap, title: "Lightning fast filing", body: "Wyoming LLCs filed in as little as 3 business days from approval." },
  { icon: Globe2, title: "Worldwide founders", body: "International founders in 40+ countries successfully served." },
  { icon: LockKeyhole, title: "Secure document vault", body: "Upload, preview, and download your legal documents anytime." },
  { icon: HeadphonesIcon, title: "Dedicated support", body: "Expert team available to answer formation questions at every step." },
  { icon: Award, title: "Transparent pricing", body: "No hidden fees, no confusing tiers — one fixed price per state." }
];

const testimonials = [
  {
    name: "Ahmed Al-Rashid",
    role: "Founder, TechFlow SaaS",
    country: "UAE",
    body: "OneClick Corporate made forming my Wyoming LLC incredibly smooth. The dashboard kept me informed every step of the way.",
    rating: 5
  },
  {
    name: "Maria González",
    role: "E-commerce Entrepreneur",
    country: "Mexico",
    body: "As a non-US founder, I was worried about complexity. The process was straightforward and completed in 4 days.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Freelance Consultant",
    country: "India",
    body: "The document upload system is excellent. Everything organized in one place — passport, address proof, agreements.",
    rating: 5
  }
];

const faqs = [
  {
    q: "Do you support non-US founders?",
    a: "Yes. OneClick Corporate is built specifically for international entrepreneurs. Founders from 40+ countries have successfully formed US LLCs through our platform."
  },
  {
    q: "Are the prices fixed with no hidden fees?",
    a: "Absolutely. The listed package price is the total — no hidden formation fees, no upsells. State filing fees are included in the package price."
  },
  {
    q: "How long does LLC formation take?",
    a: "Wyoming LLCs take 3–5 business days, Florida 5–8, New York 10–14, and Texas 7–10. All timelines begin after your documents are verified."
  },
  {
    q: "Can I upload documents securely?",
    a: "Yes. Your dashboard includes an encrypted document vault where you can upload, preview, and download files at any time."
  },
  {
    q: "What entity types do you support?",
    a: "We currently specialize in LLC formation — the most popular structure for online businesses and international founders. C-Corps coming soon."
  },
  {
    q: "What happens after I pay?",
    a: "You'll receive an immediate confirmation and gain access to your formation dashboard with a live progress tracker and document center."
  }
];

const logos = ["Stripe", "PayPal", "Shopify", "Amazon", "Notion", "Figma", "Vercel", "GitHub"];

/* ──────── Page ──────── */
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-white dark:bg-brand-black">
          {/* Background grid */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#EAEAEA_1px,transparent_1px),linear-gradient(to_bottom,#EAEAEA_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 dark:opacity-10" />
          {/* Red accent blob */}
          <div className="pointer-events-none absolute -right-64 -top-64 h-[600px] w-[600px] rounded-full bg-brand-red opacity-5 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 top-1/2 h-80 w-80 rounded-full bg-brand-red opacity-5 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
            <AnimatedSection className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-light-gray bg-white px-4 py-1.5 text-sm font-medium shadow-card dark:border-white/10 dark:bg-white/5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-red" />
                </span>
                Trusted by 2,400+ founders worldwide
              </div>

              <h1 className="text-5xl font-black tracking-tight text-brand-black dark:text-white sm:text-6xl lg:text-7xl" style={{ letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Build Your US Company
                <span className="block text-brand-red">From Anywhere</span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-brand-dark-gray/70 dark:text-white/60">
                Fast LLC formation services for entrepreneurs and founders worldwide.
                Wyoming, Florida, New York, and Texas — transparent fixed pricing, no surprises.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/register-company" size="lg" className="w-full sm:w-auto">
                  Start Registration
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/pricing" variant="outline" size="lg" className="w-full sm:w-auto">
                  Compare States
                </ButtonLink>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-brand-dark-gray/60 dark:text-white/40">
                {["No hidden fees", "International founders welcome", "SSL encrypted", "Secure document vault"].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-brand-red" />
                    {item}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* Hero dashboard mockup */}
            <AnimatedSection delay={0.15} className="mx-auto mt-16 max-w-3xl">
              <div className="overflow-hidden rounded-2xl border border-brand-light-gray bg-white shadow-soft dark:border-white/10 dark:bg-brand-dark-gray">
                {/* Window chrome */}
                <div className="flex items-center gap-2 border-b border-brand-light-gray px-4 py-3 dark:border-white/10">
                  <span className="size-3 rounded-full bg-red-400" />
                  <span className="size-3 rounded-full bg-yellow-400" />
                  <span className="size-3 rounded-full bg-green-400" />
                  <span className="ml-3 flex-1 rounded-md bg-brand-off-white px-3 py-1 text-xs text-brand-dark-gray/40 dark:bg-white/5">
                    dashboard.oneclickcorporate.com
                  </span>
                </div>
                <div className="grid md:grid-cols-[200px_1fr]">
                  {/* Sidebar */}
                  <div className="hidden border-r border-brand-light-gray p-4 dark:border-white/10 md:block">
                    <div className="mb-4 flex items-center gap-2 rounded-lg bg-brand-red/10 px-3 py-2">
                      <div className="size-6 rounded-full bg-brand-red" />
                      <span className="text-xs font-semibold text-brand-red">Overview</span>
                    </div>
                    {["Applications", "Documents", "Billing", "Support"].map((item) => (
                      <div key={item} className="mb-1 rounded-lg px-3 py-2 text-xs text-brand-dark-gray/50 dark:text-white/40">{item}</div>
                    ))}
                  </div>
                  {/* Main content */}
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">Wyoming LLC Application</p>
                        <p className="font-bold text-brand-dark-gray dark:text-white">Atlas Ledger LLC</p>
                      </div>
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
                        Filing In Progress
                      </span>
                    </div>
                    <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-brand-light-gray dark:bg-white/10">
                      <div className="h-full w-[65%] rounded-full bg-brand-red" />
                    </div>
                    <div className="grid gap-2">
                      {[
                        { label: "Submitted", done: true },
                        { label: "In Review", done: true },
                        { label: "Filing In Progress", done: true, active: true },
                        { label: "Completed", done: false }
                      ].map(({ label, done, active }) => (
                        <div key={label} className={`flex items-center gap-3 rounded-lg px-3 py-2 ${active ? "bg-brand-red/5 dark:bg-brand-red/10" : ""}`}>
                          <div className={`size-5 rounded-full flex items-center justify-center shrink-0 ${done ? "bg-brand-red" : "border-2 border-brand-light-gray dark:border-white/20"}`}>
                            {done && <CheckCircle2 className="size-3 text-white" />}
                          </div>
                          <span className={`text-xs font-medium ${active ? "text-brand-red" : done ? "text-brand-dark-gray dark:text-white" : "text-brand-dark-gray/40 dark:text-white/30"}`}>
                            {label}
                          </span>
                          {active && <span className="ml-auto text-xs text-brand-red animate-pulse2">Active</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Scroll hint */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-brand-dark-gray/30 dark:text-white/20">
            <ChevronDown className="size-4 animate-bounce" />
          </div>
        </section>

        {/* ── TRUSTED BY ── */}
        <section className="border-y border-brand-light-gray bg-brand-off-white py-12 dark:border-white/10 dark:bg-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-brand-dark-gray/40 dark:text-white/30">
              Founders from companies building with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              {logos.map((name) => (
                <span key={name} className="text-lg font-black tracking-tight text-brand-dark-gray/20 dark:text-white/20">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="bg-brand-red py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map(({ value, label }) => (
                <StaggerItem key={label} className="text-center">
                  <p className="text-4xl font-black tracking-tight" style={{ letterSpacing: "-0.03em" }}>{value}</p>
                  <p className="mt-1 text-sm text-white/70">{label}</p>
                </StaggerItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="bg-white py-24 dark:bg-brand-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Process</p>
              <h2 className="text-4xl font-black tracking-tight text-brand-black dark:text-white sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                From idea to incorporated
                <span className="block text-brand-dark-gray/40 dark:text-white/30">in three simple steps</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection stagger className="grid gap-6 md:grid-cols-3">
              {steps.map(({ step, title, body, icon: Icon }) => (
                <StaggerItem key={step}>
                  <div className="group relative h-full overflow-hidden rounded-2xl border border-brand-light-gray bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-soft dark:border-white/10 dark:bg-white/5">
                    <div className="mb-6 flex items-start justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                        <Icon className="size-5" />
                      </div>
                      <span className="text-5xl font-black text-brand-dark-gray/8 dark:text-white/5" style={{ lineHeight: 1 }}>{step}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-brand-black dark:text-white">{title}</h3>
                    <p className="text-sm leading-7 text-brand-dark-gray/60 dark:text-white/50">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="bg-brand-off-white py-24 dark:bg-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Pricing</p>
                <h2 className="text-4xl font-black tracking-tight text-brand-black dark:text-white sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                  One price. No surprises.
                </h2>
                <p className="mt-4 max-w-xl text-brand-dark-gray/60 dark:text-white/50">
                  Choose your state and get started immediately. All formation documents, status tracking, and the document vault included.
                </p>
              </div>
              <ButtonLink href="/pricing" variant="outline">
                View full comparison
              </ButtonLink>
            </AnimatedSection>
            <PricingCards />
          </div>
        </section>

        {/* ── WHY CHOOSE US ── */}
        <section className="bg-white py-24 dark:bg-brand-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 max-w-2xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Why us</p>
              <h2 className="text-4xl font-black tracking-tight text-brand-black dark:text-white sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                Built for founders
                <span className="block text-brand-dark-gray/40 dark:text-white/30">who mean business</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {benefits.map(({ icon: Icon, title, body }) => (
                <StaggerItem key={title}>
                  <div className="group h-full rounded-2xl border border-brand-light-gray bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/30 hover:shadow-soft dark:border-white/10 dark:bg-white/5">
                    <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red transition-colors group-hover:bg-brand-red group-hover:text-white">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mb-2 font-bold text-brand-black dark:text-white">{title}</h3>
                    <p className="text-sm leading-6 text-brand-dark-gray/60 dark:text-white/50">{body}</p>
                  </div>
                </StaggerItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ── INTERNATIONAL FOUNDERS ── */}
        <section className="overflow-hidden bg-brand-black py-24 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-16 lg:grid-cols-2">
              <AnimatedSection direction="right">
                <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Global reach</p>
                <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                  Living outside the US?
                  <span className="block text-white/40">You belong here.</span>
                </h2>
                <p className="mt-5 text-base leading-8 text-white/60">
                  OneClick Corporate was designed from day one for international entrepreneurs. No US address required, no bank account needed, no lawyer required. Just a guided form and a secure portal.
                </p>
                <ul className="mt-8 grid gap-3 text-sm">
                  {[
                    "No US residency required",
                    "No SSN or ITIN required to form LLC",
                    "Support for 40+ countries",
                    "Bilingual support team (English + Arabic)",
                    "Accepts international payment methods"
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/70">
                      <CheckCircle2 className="size-4 shrink-0 text-brand-red" />
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink href="/register-company" variant="primary" size="lg" className="mt-10">
                  Start your US LLC
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={0.1}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { flag: "🇦🇪", country: "UAE", count: "420+" },
                    { flag: "🇮🇳", country: "India", count: "380+" },
                    { flag: "🇵🇰", country: "Pakistan", count: "210+" },
                    { flag: "🇲🇽", country: "Mexico", count: "180+" },
                    { flag: "🇳🇬", country: "Nigeria", count: "160+" },
                    { flag: "🇧🇷", country: "Brazil", count: "140+" }
                  ].map(({ flag, country, count }) => (
                    <div key={country} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                      <span className="text-2xl">{flag}</span>
                      <div>
                        <p className="font-semibold">{country}</p>
                        <p className="text-xs text-white/40">{count} founders</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="bg-brand-off-white py-24 dark:bg-white/5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Testimonials</p>
              <h2 className="text-4xl font-black tracking-tight text-brand-black dark:text-white sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                Founders love the experience
              </h2>
            </AnimatedSection>

            <AnimatedSection stagger className="grid gap-6 md:grid-cols-3">
              {testimonials.map(({ name, role, country, body, rating }) => (
                <StaggerItem key={name}>
                  <div className="flex h-full flex-col rounded-2xl border border-brand-light-gray bg-white p-7 shadow-card dark:border-white/10 dark:bg-white/5">
                    <div className="mb-5 flex">
                      {Array.from({ length: rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-brand-red text-brand-red" />
                      ))}
                    </div>
                    <p className="flex-1 text-sm leading-7 text-brand-dark-gray/70 dark:text-white/60">
                      &ldquo;{body}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-brand-light-gray pt-5 dark:border-white/10">
                      <div className="flex size-10 items-center justify-center rounded-full bg-brand-red font-bold text-sm text-white">
                        {name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-black dark:text-white">{name}</p>
                        <p className="text-xs text-brand-dark-gray/50 dark:text-white/40">{role} · {country}</p>
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="bg-white py-24 dark:bg-brand-black">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="mb-14 text-center">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">FAQ</p>
              <h2 className="text-4xl font-black tracking-tight text-brand-black dark:text-white sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                Common questions
              </h2>
            </AnimatedSection>

            <AnimatedSection stagger className="grid gap-4">
              {faqs.map(({ q, a }) => (
                <StaggerItem key={q}>
                  <div className="rounded-2xl border border-brand-light-gray bg-white p-7 dark:border-white/10 dark:bg-white/5">
                    <h3 className="mb-3 font-bold text-brand-black dark:text-white">{q}</h3>
                    <p className="text-sm leading-7 text-brand-dark-gray/60 dark:text-white/50">{a}</p>
                  </div>
                </StaggerItem>
              ))}
            </AnimatedSection>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="bg-brand-red py-24 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <AnimatedSection>
              <h2 className="text-4xl font-black tracking-tight sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                Ready to form your US LLC?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-white/70">
                Join 2,400+ founders who built their US presence with OneClick Corporate. Start today — most formations complete within the week.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href="/register-company" variant="secondary" size="lg" className="w-full sm:w-auto bg-white text-brand-red hover:bg-brand-off-white">
                  Start Registration
                  <ArrowRight className="size-4" />
                </ButtonLink>
                <ButtonLink href="/pricing" variant="ghost" size="lg" className="w-full sm:w-auto text-white hover:bg-white/10">
                  View Pricing
                </ButtonLink>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="bg-white py-24 dark:bg-brand-black">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <AnimatedSection direction="right">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand-red">Contact</p>
              <h2 className="text-4xl font-black tracking-tight text-brand-black dark:text-white sm:text-5xl" style={{ letterSpacing: "-0.03em" }}>
                Get in touch
              </h2>
              <p className="mt-4 text-brand-dark-gray/60 dark:text-white/50">
                Speak with the OneClick Corporate team about your US LLC formation. We reply within 24 hours.
              </p>
              <div className="mt-8 grid gap-4 text-sm">
                {[
                  { icon: MessageSquare, label: "Email", value: "support@oneclickcorporate.com" },
                  { icon: Users, label: "Support hours", value: "Mon–Fri, 9am–6pm EST" }
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-brand-red/10 text-brand-red">
                      <Icon className="size-4" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-dark-gray/40 dark:text-white/30">{label}</p>
                      <p className="font-medium text-brand-black dark:text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="left" delay={0.1}>
              <div className="rounded-2xl border border-brand-light-gray bg-white p-8 shadow-card dark:border-white/10 dark:bg-white/5">
                <form className="grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Full name</label>
                      <input
                        className="h-11 w-full rounded-lg border border-brand-light-gray bg-brand-off-white px-3 text-sm transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Email address</label>
                      <input
                        type="email"
                        className="h-11 w-full rounded-lg border border-brand-light-gray bg-brand-off-white px-3 text-sm transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Subject</label>
                    <input
                      className="h-11 w-full rounded-lg border border-brand-light-gray bg-brand-off-white px-3 text-sm transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
                      placeholder="LLC formation inquiry"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Message</label>
                    <textarea
                      className="min-h-32 w-full rounded-lg border border-brand-light-gray bg-brand-off-white px-3 py-3 text-sm transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white"
                      placeholder="Tell us about your business and how we can help…"
                    />
                  </div>
                  <ButtonLink href="mailto:support@oneclickcorporate.com" className="w-full">
                    Send message
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
