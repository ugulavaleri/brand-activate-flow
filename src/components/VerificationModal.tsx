import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const codeSchema = z.object({
  code: z.string().length(6, "გთხოვთ შეიყვანოთ 6-ციფრიანი კოდი"),
});

type CodeFormData = z.infer<typeof codeSchema>;

interface VerificationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone: string;
}

export function VerificationModal({ open, onOpenChange, phone }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (code.length !== 6) {
      setError("გთხოვთ შეიყვანოთ 6-ციფრიანი კოდი");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      // Mock API call - Replace with actual endpoint
      // const response = await fetch('/verify-phone', {
      //   method: 'POST',
      //   body: JSON.stringify({ phone, code }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock verification - in production check response
      if (code === "123456") {
        setIsVerified(true);
      } else {
        setError("კოდი არასწორია. გთხოვთ სცადოთ ხელახლა.");
      }
    } catch (err) {
      setError("ვერიფიკაცია ვერ მოხერხდა. გთხოვთ სცადოთ ხელახლა.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError(null);

    try {
      // Mock API call - Replace with actual endpoint
      // await fetch('/resend-code', { method: 'POST', body: JSON.stringify({ phone }) });

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setCode("");
    } catch (err) {
      setError("კოდის ხელახლა გაგზავნა ვერ მოხერხდა.");
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary shadow-md">
            {isVerified ? (
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            ) : (
              <Phone className="h-8 w-8 text-primary-foreground" />
            )}
          </div>
          <DialogTitle className="text-xl font-bold text-foreground">
            {isVerified ? "ტელეფონი დადასტურებულია!" : "დაადასტურე ტელეფონი"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {isVerified
              ? "თქვენი ტელეფონის ნომერი წარმატებით დადასტურდა."
              : `ვერიფიკაციის კოდი გაიგზავნა ნომერზე ${phone}`}
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
                      className="h-12 w-12 rounded-lg border-2 border-input text-lg font-bold transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <p className="text-center text-sm text-destructive animate-fade-up">{error}</p>
            )}

            <Button
              variant="brand"
              size="lg"
              className="w-full"
              onClick={handleVerify}
              disabled={isVerifying || code.length !== 6}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  მოწმდება...
                </>
              ) : (
                "ნომრის დადასტურება"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
              >
                {isResending ? "იგზავნება..." : "კოდის ხელახლა გაგზავნა"}
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-4">
            <Button variant="brand" size="lg" className="w-full" onClick={handleClose}>
              გაგრძელება
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
