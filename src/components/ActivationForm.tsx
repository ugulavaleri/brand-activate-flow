import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

interface ActivationFormProps {
  onSubmitSuccess: (data: FormInputs) => void;
}

export function ActivationForm({ onSubmitSuccess }: ActivationFormProps) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<{ phone?: string; email?: string }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setFileError(t.form.errors.fileTooLarge);
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: FormInputs) => {
    setIsSubmitting(true);
    setServerErrors({});

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      if (file) {
        formData.append("license", file);
      }

      await new Promise((resolve) => setTimeout(resolve, 1500));
      onSubmitSuccess(data);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* First Name */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium text-slate-300">
            {t.form.firstName} {t.form.required}
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="firstName"
              placeholder={t.form.placeholders.firstName}
              className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              {...register("firstName", { required: t.form.errors.firstNameRequired })}
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-red-400">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium text-slate-300">
            {t.form.lastName} {t.form.required}
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="lastName"
              placeholder={t.form.placeholders.lastName}
              className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              {...register("lastName", { required: t.form.errors.lastNameRequired })}
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-red-400">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-medium text-slate-300">
          {t.form.phone} {t.form.required}
        </Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            id="phone"
            type="tel"
            placeholder={t.form.placeholders.phone}
            className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
            {...register("phone", { required: t.form.errors.phoneRequired })}
          />
        </div>
        {errors.phone && <p className="text-sm text-red-400">{errors.phone.message}</p>}
        {serverErrors.phone && <p className="text-sm text-red-400">{serverErrors.phone}</p>}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-slate-300">
          {t.form.email} {t.form.required}
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            id="email"
            type="email"
            placeholder={t.form.placeholders.email}
            className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
            {...register("email", { required: t.form.errors.emailRequired })}
          />
        </div>
        {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
        {serverErrors.email && <p className="text-sm text-red-400">{serverErrors.email}</p>}
      </div>

      {/* License Upload */}
      <div className="space-y-2">
        <Label htmlFor="license" className="text-sm font-medium text-slate-300">
          {t.form.license}
        </Label>
        <label
          htmlFor="license"
          className={cn(
            "flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed p-6 transition-all duration-200",
            "bg-white/5 hover:bg-white/10 hover:border-emerald-500/50",
            fileError ? "border-red-500/50" : "border-white/10",
            file && "border-emerald-500/50 bg-emerald-500/10"
          )}
        >
          {file ? (
            <>
              <CheckCircle className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white">{file.name}</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 text-slate-500" />
              <span className="text-sm text-slate-400">
                {t.form.licenseUpload}
              </span>
            </>
          )}
          <input
            id="license"
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            onChange={handleFileChange}
          />
        </label>
        {fileError && <p className="text-sm text-red-400">{fileError}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold shadow-lg shadow-emerald-500/25 transition-all duration-200 hover:shadow-emerald-500/40"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            {t.form.submitting}
          </>
        ) : (
          t.form.submit
        )}
      </Button>
    </form>
  );
}
