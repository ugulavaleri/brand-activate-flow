import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import translations from "@/locales/translations.json";
import { API_BASE } from "@/lib/api";

type Language = "ka" | "en";
type Translations = typeof translations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations["ka"];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("martev-language");
    return (saved as Language) || "ka";
  });
  const [remoteTranslations, setRemoteTranslations] =
    useState<Translations | null>(null);

  useEffect(() => {
    localStorage.setItem("martev-language", language);
  }, [language]);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const res = await fetch(`${API_BASE}/languages`);
        if (!res.ok) {
          throw new Error("Failed to fetch translations");
        }
        const data = await res.json();
        setRemoteTranslations(data);
      } catch (error) {
        console.error("Translation fetch error:", error);
      }
    };

    loadTranslations();
  }, []);

  const activeTranslations = remoteTranslations || translations;
  const t = activeTranslations[language] || translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
