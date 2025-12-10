import { useState } from "react";
import { ActivationForm } from "@/components/ActivationForm";
import { VerificationModal } from "@/components/VerificationModal";
import { Footer } from "@/components/Footer";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LanguageProvider, useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/martev-logo.svg";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

function IndexContent() {
  const [showVerification, setShowVerification] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const { t } = useLanguage();

  const handleFormSuccess = (data: FormData) => {
    setSubmittedData(data);
    setShowVerification(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Gradient Background */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1f2e] via-[#0f1419] to-[#0a1628]">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4 z-20">
          <LanguageSwitcher />
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-emerald-500/15 blur-[80px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[600px] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 py-16">
          <div className="mx-auto max-w-lg">
            {/* Logo & Header */}
            <div className="mb-10 text-center animate-fade-up">
              <img
                src={logo}
                alt="MartEV Logo"
                className="mx-auto mb-8 h-14 w-auto"
              />
              
              {/* Hero Title */}
              <div className="mb-6 space-y-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  MartEV
                </p>
                <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {t.hero.title}
                </h1>
                <h2 className="text-2xl font-bold text-primary sm:text-3xl lg:text-4xl">
                  {t.hero.titleHighlight}
                </h2>
              </div>
              
              {/* Subtitle with decorative line */}
              <div className="flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-primary/50" />
                <p className="text-base text-gray-400 sm:text-lg">
                  {t.hero.subtitle}
                </p>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-primary/50" />
              </div>
            </div>

            {/* Form Card */}
            <div 
              className="rounded-2xl bg-white/[0.02] backdrop-blur-xl p-8 shadow-2xl border border-white/10 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <ActivationForm onSubmitSuccess={handleFormSuccess} />
            </div>

            {/* Website Link */}
            <div className="mt-6 text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <a
                href="https://martev.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm"
              >
                {t.hero.websiteLink}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Verification Modal */}
      <VerificationModal
        open={showVerification}
        onOpenChange={setShowVerification}
        phone={submittedData?.phone || ""}
      />
    </div>
  );
}

const Index = () => {
  return (
    <LanguageProvider>
      <IndexContent />
    </LanguageProvider>
  );
};

export default Index;
