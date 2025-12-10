import { useState } from "react";
import { ActivationForm } from "@/components/ActivationForm";
import { VerificationModal } from "@/components/VerificationModal";
import { Footer } from "@/components/Footer";
import logo from "@/assets/martev-logo.svg";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

const Index = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleFormSuccess = (data: FormData) => {
    setSubmittedData(data);
    setShowVerification(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center overflow-hidden">
        {/* Background Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute -right-40 top-1/4 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        </div>

        <div className="container relative z-10 mx-auto px-6 py-12">
          <div className="mx-auto max-w-xl">
            {/* Logo & Header */}
            <div className="mb-8 text-center animate-fade-up">
              <img
                src={logo}
                alt="MartEV Logo"
                className="mx-auto mb-6 h-16 w-auto"
              />
              <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Activate Your{" "}
                <span className="gradient-text">MartEV</span>{" "}
                Account
              </h1>
              <p className="text-lg text-muted-foreground">
                Complete the form below to get started with your electric vehicle journey.
              </p>
            </div>

            {/* Form Card */}
            <div 
              className="rounded-2xl border border-border/50 bg-card p-8 shadow-brand-lg animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <ActivationForm onSubmitSuccess={handleFormSuccess} />
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
};

export default Index;
