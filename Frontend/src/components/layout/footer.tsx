import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const links = {
  Services: [
    { label: "Wyoming LLC — $250", href: "/register-company?state=wyoming" },
    { label: "Florida LLC — $320", href: "/register-company?state=florida" },
    { label: "New York LLC — $340", href: "/register-company?state=new-york" },
    { label: "Texas LLC — $390", href: "/register-company?state=texas" }
  ],
  Company: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "FAQ", href: "/#faq" },
    { label: "Contact", href: "/#contact" }
  ],
  Account: [
    { label: "Sign up", href: "/auth/register" },
    { label: "Log in", href: "/auth/login" },
    { label: "Dashboard", href: "/dashboard" }
  ]
};

const social = [
  { icon: XIcon, href: "#", label: "Twitter / X" },
  { icon: LinkedInIcon, href: "#", label: "LinkedIn" },
  { icon: Globe, href: "#", label: "Website" }
];

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-16 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Premium US LLC formation services for international founders. Fast, secure, and transparent.
            </p>
            <div className="mt-6 grid gap-2.5 text-sm text-white/60">
              <a href="mailto:support@oneclickcorporate.com" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                <Mail className="size-4 shrink-0" />
                support@oneclickcorporate.com
              </a>
              <a href="tel:+13025550198" className="flex items-center gap-2 hover:text-brand-red transition-colors">
                <Phone className="size-4 shrink-0" />
                +1 (302) 555-0198
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" />
                United States (Serving worldwide)
              </span>
            </div>
            <div className="mt-6 flex items-center gap-3">
              {social.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid size-9 place-items-center rounded-lg border border-white/10 text-white/60 hover:border-brand-red hover:text-brand-red transition-colors"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">{group}</h3>
              <ul className="grid gap-2.5">
                {items.map(({ label, href }) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 hover:text-brand-red transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} OneClick Corporate. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
