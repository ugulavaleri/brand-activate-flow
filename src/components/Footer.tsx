import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/martev-logo.svg";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Company Info */}
          <div className="space-y-4">
            <img src={logo} alt="MartEV Logo" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">
              Electric vehicle solutions for a sustainable future.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-bold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm text-muted-foreground">
                  123 Innovation Drive, Suite 500<br />
                  San Francisco, CA 94105
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="tel:+14155551234"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  +1 (415) 555-1234
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:info@martev.com"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  info@martev.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-primary/20 pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MartEV. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
