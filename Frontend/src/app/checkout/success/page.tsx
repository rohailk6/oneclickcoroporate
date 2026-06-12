import { ReceiptText } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ButtonLink } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 text-center">
        <div>
          <ReceiptText className="mx-auto mb-6 size-16 text-navy-500" />
          <h1 className="text-4xl font-bold">Payment Successful</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Your payment was recorded and an invoice is available in billing.</p>
          <ButtonLink href="/dashboard" className="mt-8">View Order History</ButtonLink>
        </div>
      </main>
      <Footer />
    </>
  );
}
