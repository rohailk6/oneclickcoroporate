"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();

  const [form, setForm] = useState({ fullName: "", email: "", phoneNumber: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const redirectTo = params.get("redirect") ?? "/";

  function set(k: keyof typeof form, v: string) {
    setForm(f => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { user, token } = await api<{ user: any; token: string }>("/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      login(user, token);
      toast.success(`Account created! Welcome, ${user.fullName}.`);
      router.push(redirectTo);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputCls = "h-11 w-full rounded-lg border border-brand-light-gray bg-white px-3 text-sm text-brand-dark-gray placeholder:text-brand-dark-gray/40 transition-all focus:border-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/20 dark:border-white/15 dark:bg-white/5 dark:text-white dark:placeholder:text-white/30";

  return (
    <div className="min-h-screen bg-brand-off-white dark:bg-brand-black">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left panel */}
        <div className="hidden flex-col justify-between bg-brand-black p-12 lg:flex">
          <Logo variant="light" size="sm" />
          <div>
            <h2 className="text-4xl font-black text-white" style={{ letterSpacing: "-0.02em" }}>
              Join founders building
              <span className="block text-brand-red">their US company.</span>
            </h2>
            <p className="mt-4 text-base text-white/60">
              Create your free account to begin your LLC formation — no US residency required.
            </p>
            <ul className="mt-8 grid gap-3 text-sm text-white/70">
              {["Form an LLC in Wyoming, Florida, New York, or Texas", "Secure document vault included", "Track your formation in real time", "International founders welcome"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 shrink-0 text-brand-red" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Shield className="size-4" />
            256-bit SSL encrypted · Your data is always protected
          </div>
        </div>

        {/* Right panel */}
        <div className="flex flex-col items-center justify-center px-6 py-12">
          <div className="mb-8 lg:hidden">
            <Logo size="sm" />
          </div>

          <div className="w-full max-w-md">
            <h1 className="text-3xl font-black text-brand-black dark:text-white" style={{ letterSpacing: "-0.02em" }}>Create your account</h1>
            <p className="mt-2 text-sm text-brand-dark-gray/60 dark:text-white/40">Register to start your US LLC formation.</p>

            {/* Google button */}
            <button
              type="button"
              onClick={() => toast.info("Google sign-in requires OAuth configuration — use email/password for now.")}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-lg border border-brand-light-gray bg-white py-2.5 text-sm font-medium text-brand-dark-gray transition-all hover:border-brand-red/40 hover:shadow-sm dark:border-white/15 dark:bg-white/5 dark:text-white/80"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 border-t border-brand-light-gray dark:border-white/10" />
              <span className="text-xs text-brand-dark-gray/40 dark:text-white/30">or continue with email</span>
              <div className="flex-1 border-t border-brand-light-gray dark:border-white/10" />
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Full name</label>
                <input type="text" required placeholder="John Smith" value={form.fullName} onChange={e => set("fullName", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Email address</label>
                <input type="email" required placeholder="john@example.com" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Phone number</label>
                <input type="tel" required placeholder="+1 (555) 000-0000" value={form.phoneNumber} onChange={e => set("phoneNumber", e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-brand-dark-gray dark:text-white/80">Password</label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} required minLength={8} placeholder="At least 8 characters" value={form.password} onChange={e => set("password", e.target.value)} className={inputCls + " pr-10"} />
                  <button type="button" tabIndex={-1} onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-dark-gray/40 hover:text-brand-dark-gray dark:text-white/30">
                    {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>
              <p className="text-xs text-brand-dark-gray/50 dark:text-white/30">
                By creating an account you agree to our{" "}
                <Link href="#" className="text-brand-red hover:underline">Terms of Service</Link>{" "}and{" "}
                <Link href="#" className="text-brand-red hover:underline">Privacy Policy</Link>.
              </p>
              <Button type="submit" className="w-full" size="lg" loading={loading}>
                Create account <ArrowRight className="size-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-brand-dark-gray/60 dark:text-white/40">
              Already have an account?{" "}
              <Link href={`/auth/login${redirectTo !== "/" ? `?redirect=${redirectTo}` : ""}`} className="font-medium text-brand-red hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
