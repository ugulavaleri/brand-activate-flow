import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-primary-foreground/20">
      <Globe className="h-4 w-4 text-primary-foreground/70" />
      <button
        onClick={() => setLanguage("ka")}
        className={`text-sm font-medium px-2 py-0.5 rounded transition-colors ${
          language === "ka"
            ? "bg-primary text-primary-foreground"
            : "text-primary-foreground/70 hover:text-primary-foreground"
        }`}
      >
        ქარ
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`text-sm font-medium px-2 py-0.5 rounded transition-colors ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-primary-foreground/70 hover:text-primary-foreground"
        }`}
      >
        ENG
      </button>
    </div>
  );
}
