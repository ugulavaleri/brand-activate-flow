import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Check } from "lucide-react";

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
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span className="text-sm font-medium text-white">{currentLang.label}</span>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="absolute right-0 top-full mt-2 z-50 w-44 rounded-xl bg-[#1a2332] border border-white/10 shadow-2xl shadow-black/50 overflow-hidden animate-fade-up">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-4 py-3 text-left transition-colors ${
                  language === lang.code
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
                {language === lang.code && (
                  <Check className="ml-auto h-4 w-4 text-emerald-400" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
