import { Mail, Phone, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/martev-logo.svg";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="MartEV Logo" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              {t.footer.description}
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">{t.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="tel:+995322000000"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {t.footer.callUs}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:info@martev.io"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  info@martev.io
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="https://martev.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  martev.io
                </a>
              </div>
            </div>
          </div>

          {/* App Download */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">{t.footer.downloadApp}</h3>
            <p className="text-sm text-muted-foreground">
              {t.footer.appDescription}
            </p>
            <div className="flex gap-3">
              <a
                href="https://bit.ly/4i4KOOo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                App Store
              </a>
              <span className="text-muted-foreground">|</span>
              <a
                href="http://bit.ly/3Z5kqv2"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Google Play
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MartEV. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
