import { Mail, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/martev-logo.svg";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#080C14] border-t border-white/5">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="MartEV Logo" className="h-10 w-auto" />
            <p className="text-sm text-slate-500 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">{t.footer.contact}</h3>
            <div className="space-y-3">
              <a
                href="tel:+995322000000"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-emerald-400 group"
              >
                <Phone className="h-4 w-4 text-emerald-500" />
                {t.footer.callUs}
              </a>
              <a
                href="mailto:info@martev.io"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                <Mail className="h-4 w-4 text-emerald-500" />
                info@martev.io
              </a>
              <a
                href="https://martev.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-slate-400 transition-colors hover:text-emerald-400"
              >
                <Globe className="h-4 w-4 text-emerald-500" />
                martev.io
              </a>
            </div>
          </div>

          {/* App Download */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">{t.footer.downloadApp}</h3>
            <p className="text-sm text-slate-500">
              {t.footer.appDescription}
            </p>
            <div className="flex gap-3">
              <a
                href="https://bit.ly/4i4KOOo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                App Store
              </a>
              <a
                href="http://bit.ly/3Z5kqv2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-center text-sm text-slate-600">
            © {new Date().getFullYear()} MartEV. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
