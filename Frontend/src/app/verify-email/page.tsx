import { MailCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";

export default function VerifyEmailPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[70vh] max-w-2xl place-items-center px-4 text-center">
        <div>
          <MailCheck className="mx-auto mb-6 size-16 text-navy-500" />
          <h1 className="text-4xl font-bold">Verify Your Email</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Check your inbox for a secure verification link before accessing protected dashboard features.</p>
          <ButtonLink href="/auth/login" className="mt-8">Back to login</ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
