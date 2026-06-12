import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto grid min-h-[70vh] max-w-md place-items-center px-4 py-12">
        <Card className="w-full p-6">
          <h1 className="text-3xl font-bold">Reset Password</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Enter your email to receive a reset link.</p>
          <form className="mt-6 grid gap-4">
            <label className="grid gap-2 text-sm font-medium">Email<Input type="email" required /></label>
            <Button type="submit">Send reset link</Button>
          </form>
        </Card>
      </main>
      <Footer />
    </>
  );
}
