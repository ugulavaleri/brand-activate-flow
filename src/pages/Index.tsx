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
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden bg-[#0B1120]">
        {/* Language Switcher */}
        <div className="absolute top-6 right-6 z-20">
          <LanguageSwitcher />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-emerald-500/20 blur-[120px] animate-float" />
          <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-teal-500/15 blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute -bottom-20 left-1/3 w-[600px] h-[300px] rounded-full bg-green-500/10 blur-[120px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        <div className="container relative z-10 mx-auto px-6 py-20">
          <div className="mx-auto max-w-md">
            {/* Logo & Header */}
            <div className="mb-12 text-center animate-fade-up">
              <img
                src={logo}
                alt="MartEV Logo"
                className="mx-auto mb-10 h-12 w-auto"
              />
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-emerald-400">MartEV</span>
              </div>
              
              {/* Hero Title */}
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                {t.hero.title}
              </h1>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-6">
                {t.hero.titleHighlight}
              </h2>
              
              <p className="text-slate-400 text-lg max-w-sm mx-auto">
                {t.hero.subtitle}
              </p>
            </div>

            {/* Form Card */}
            <div 
              className="glass-card rounded-2xl p-8 shadow-2xl shadow-emerald-500/5 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <ActivationForm onSubmitSuccess={handleFormSuccess} />
            </div>

            {/* Website Link */}
            <div className="mt-8 text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <a
                href="https://martev.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 transition-colors text-sm group"
              >
                {t.hero.websiteLink}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
