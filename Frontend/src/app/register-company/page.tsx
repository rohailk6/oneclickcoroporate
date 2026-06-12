import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CompanyRegistrationForm } from "@/components/forms/company-registration-form";

export const metadata = {
  title: "Register Your LLC",
  description: "Start your US LLC formation with OneClick Corporate."
};

export default function RegisterCompanyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-brand-off-white py-10 dark:bg-brand-black">
        <CompanyRegistrationForm />
      </main>
      <Footer />
    </>
  );
}
