import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2, CheckCircle2, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
}

export function VerificationModal({ open, onOpenChange, phone }: VerificationModalProps) {
  const { t } = useLanguage();
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError(t.verification.codeError);
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (code === "123456") {
        setIsVerified(true);
      } else {
        setError(t.verification.incorrectCode);
      }
    } catch (err) {
      setError(t.verification.verifyFailed);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCode("");
    } catch (err) {
      setError(t.verification.resendFailed);
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    setCode("");
    setError(null);
    setIsVerified(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#0f1520] border-white/10">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25">
            {isVerified ? (
              <CheckCircle2 className="h-8 w-8 text-white" />
            ) : (
              <Phone className="h-8 w-8 text-white" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-white">
            {isVerified ? t.verification.titleSuccess : t.verification.title}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {isVerified
              ? t.verification.subtitleSuccess
              : `${t.verification.subtitle} ${phone}`}
          </DialogDescription>
        </DialogHeader>

        {!isVerified ? (
          <div className="space-y-6 pt-4">
            <div className="flex justify-center">
              <InputOTP
                value={code}
                onChange={(value) => {
                  setCode(value);
                  setError(null);
                }}
                maxLength={6}
              >
                <InputOTPGroup className="gap-2">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="h-12 w-12 rounded-lg border-2 border-white/10 bg-white/5 text-lg font-bold text-white transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p className="text-center text-sm text-red-400 animate-fade-up">{error}</p>
            )}

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold"
              onClick={handleVerify}
              disabled={isVerifying || code.length !== 6}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {t.verification.verifying}
                </>
              ) : (
                t.verification.verify
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm font-medium text-emerald-400 hover:text-emerald-300 disabled:opacity-50 transition-colors"
              >
                {isResending ? t.verification.resending : t.verification.resend}
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4">
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold"
              onClick={handleClose}
            >
              {t.verification.continue}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
