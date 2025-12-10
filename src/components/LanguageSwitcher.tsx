import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: "ka" as const, label: "ქართული", flag: "🇬🇪" },
    { code: "en" as const, label: "English", flag: "🇬🇧" },
  ];

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-lg border border-border hover:border-primary/50 transition-all duration-200"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-foreground">{currentLang.label}</span>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 z-50 w-40 rounded-xl bg-card border border-border shadow-xl overflow-hidden animate-fade-up">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  language === lang.code
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
                {language === lang.code && (
                  <svg className="ml-auto h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
