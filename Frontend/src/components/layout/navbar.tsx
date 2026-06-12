"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Menu, ArrowRight, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "States", href: "/#states", children: [
    { label: "Wyoming — $250", href: "/register-company?state=wyoming" },
    { label: "Florida — $320", href: "/register-company?state=florida" },
    { label: "New York — $340", href: "/register-company?state=new-york" },
    { label: "Texas — $390", href: "/register-company?state=texas" }
  ]},
  { label: "FAQ", href: "/#faq" }
];

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    toast.success("Logged out");
    router.push("/");
  }

  const initials = user?.fullName
    ? user.fullName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase()
    : "";

  return (
    <>
      <header className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-card border-b border-brand-light-gray dark:bg-brand-dark-gray/95"
          : "bg-white dark:bg-brand-dark-gray border-b border-transparent"
      )}>
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo — constrained to navbar height */}
          <Link href="/" className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg">
            <img
              src="/images/logo.jpeg"
              alt="OneClick Corporate"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label} className="relative"
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-colors dark:text-white/80 dark:hover:text-brand-red">
                    {link.label}
                    <ChevronDown className={cn("size-3.5 transition-transform", openDropdown === link.label && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-brand-light-gray bg-white shadow-soft dark:border-white/10 dark:bg-brand-dark-gray overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link key={child.label} href={child.href}
                            className="block px-4 py-2.5 text-sm text-brand-dark-gray hover:bg-brand-off-white hover:text-brand-red transition-colors dark:text-white/80 dark:hover:bg-white/5 dark:hover:text-brand-red">
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link key={link.label} href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-colors dark:text-white/80 dark:hover:text-brand-red">
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                {/* User avatar + dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen(v => !v)}
                    className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-brand-dark-gray hover:bg-brand-off-white transition-colors dark:text-white/80 dark:hover:bg-white/10"
                  >
                    <span className="flex size-7 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">
                      {initials}
                    </span>
                    <span className="max-w-[140px] truncate">{user.fullName}</span>
                    <ChevronDown className={cn("size-3.5 transition-transform", userMenuOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-brand-light-gray bg-white shadow-soft dark:border-white/10 dark:bg-brand-dark-gray overflow-hidden"
                      >
                        <div className="border-b border-brand-light-gray px-4 py-3 dark:border-white/10">
                          <p className="text-xs font-semibold text-brand-dark-gray dark:text-white truncate">{user.fullName}</p>
                          <p className="text-xs text-brand-dark-gray/50 dark:text-white/40 truncate">{user.email}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-brand-dark-gray hover:bg-brand-off-white hover:text-brand-red transition-colors dark:text-white/80 dark:hover:bg-white/5">
                          <LayoutDashboard className="size-4" /> Dashboard
                        </Link>
                        <button onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-brand-dark-gray hover:bg-brand-off-white hover:text-brand-red transition-colors dark:text-white/80 dark:hover:bg-white/5">
                          <LogOut className="size-4" /> Log out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                {/* Start Registration (goes directly to form when logged in) */}
                <Link href="/register-company"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-red-dark hover:shadow-red active:scale-95">
                  Start Registration <ArrowRight className="size-3.5" />
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/login"
                  className="text-sm font-medium text-brand-dark-gray hover:text-brand-red transition-colors dark:text-white/80 dark:hover:text-brand-red">
                  Log in
                </Link>
                {/* Not logged in → goes to login first */}
                <Link href="/auth/login?redirect=/register-company"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-red px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-brand-red-dark hover:shadow-red active:scale-95">
                  Start Registration <ArrowRight className="size-3.5" />
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button type="button" aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-lg border border-brand-light-gray md:hidden dark:border-white/10"
            onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sticky top-16 z-40 overflow-hidden border-b border-brand-light-gray bg-white dark:border-white/10 dark:bg-brand-dark-gray md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {user && (
                <div className="mb-2 flex items-center gap-3 rounded-lg bg-brand-off-white px-3 py-2.5 dark:bg-white/5">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-red text-xs font-bold text-white">{initials}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-dark-gray dark:text-white">{user.fullName}</p>
                    <p className="truncate text-xs text-brand-dark-gray/50 dark:text-white/40">{user.email}</p>
                  </div>
                </div>
              )}
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark-gray hover:bg-brand-off-white hover:text-brand-red transition-colors dark:text-white/80 dark:hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}>
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 grid gap-1">
                      {link.children.map((child) => (
                        <Link key={child.label} href={child.href}
                          className="block rounded-lg px-3 py-2 text-sm text-brand-dark-gray/70 hover:text-brand-red transition-colors dark:text-white/60"
                          onClick={() => setMobileOpen(false)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <hr className="my-2 border-brand-light-gray dark:border-white/10" />
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark-gray hover:text-brand-red dark:text-white/80">
                    <LayoutDashboard className="size-4" /> Dashboard
                  </Link>
                  <button onClick={() => { handleLogout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark-gray hover:text-brand-red dark:text-white/80">
                    <LogOut className="size-4" /> Log out
                  </button>
                  <Link href="/register-company" onClick={() => setMobileOpen(false)}
                    className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark">
                    Start Registration <ArrowRight className="size-4" />
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-brand-dark-gray hover:text-brand-red dark:text-white/80">
                    Log in
                  </Link>
                  <Link href="/auth/login?redirect=/register-company" onClick={() => setMobileOpen(false)}
                    className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-brand-red px-4 py-3 text-sm font-semibold text-white hover:bg-brand-red-dark">
                    Start Registration <ArrowRight className="size-4" />
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
