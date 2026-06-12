import { CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";

export default function RegistrationSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 text-center">
        <div>
          <CheckCircle2 className="mx-auto mb-6 size-16 text-emerald-500" />
          <h1 className="text-4xl font-bold">Application Confirmed</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Your LLC registration application is now in the OneClick Corporate dashboard.</p>
          <ButtonLink href="/dashboard" className="mt-8">Open Dashboard</ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
