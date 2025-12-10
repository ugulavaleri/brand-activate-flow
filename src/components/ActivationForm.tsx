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

  const validateForm = (data: FormInputs) => {
    const newErrors: Record<string, string> = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = t.form.errors.firstNameRequired;
    } else if (data.firstName.length > 50) {
      newErrors.firstName = t.form.errors.firstNameTooLong;
    }
    
    if (!data.lastName.trim()) {
      newErrors.lastName = t.form.errors.lastNameRequired;
    } else if (data.lastName.length > 50) {
      newErrors.lastName = t.form.errors.lastNameTooLong;
    }
    
    if (!data.phone.trim()) {
      newErrors.phone = t.form.errors.phoneRequired;
    } else if (!/^[\d\s\+\-\(\)]+$/.test(data.phone)) {
      newErrors.phone = t.form.errors.phoneInvalid;
    }
    
    if (!data.email.trim()) {
      newErrors.email = t.form.errors.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = t.form.errors.emailInvalid;
    }
    
    return newErrors;
  };

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
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

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

      // Mock API response - In production, replace with actual API call
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
          <Label htmlFor="firstName" className="text-sm font-semibold text-foreground">
            {t.form.firstName} {t.form.required}
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder={t.form.placeholders.firstName}
              className="pl-11"
              error={!!errors.firstName}
              {...register("firstName", { required: t.form.errors.firstNameRequired })}
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
            {t.form.lastName} {t.form.required}
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lastName"
              placeholder={t.form.placeholders.lastName}
              className="pl-11"
              error={!!errors.lastName}
              {...register("lastName", { required: t.form.errors.lastNameRequired })}
            />
          </div>
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
          {t.form.phone} {t.form.required}
        </Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder={t.form.placeholders.phone}
            className="pl-11"
            error={!!errors.phone || !!serverErrors.phone}
            {...register("phone", { required: t.form.errors.phoneRequired })}
          />
        </div>
        {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
        {serverErrors.phone && (
          <p className="text-sm text-destructive">{serverErrors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-foreground">
          {t.form.email} {t.form.required}
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder={t.form.placeholders.email}
            className="pl-11"
            error={!!errors.email || !!serverErrors.email}
            {...register("email", { required: t.form.errors.emailRequired })}
          />
        </div>
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        {serverErrors.email && (
          <p className="text-sm text-destructive">{serverErrors.email}</p>
        )}
      </div>

      {/* License Upload */}
      <div className="space-y-2">
        <Label htmlFor="license" className="text-sm font-semibold text-foreground">
          {t.form.license}
        </Label>
        <label
          htmlFor="license"
          className={cn(
            "flex cursor-pointer items-center justify-center gap-3 rounded-lg border-2 border-dashed p-6 transition-all duration-200 hover:border-primary hover:bg-primary/5",
            fileError ? "border-destructive" : "border-input",
            file && "border-success bg-success/5"
          )}
        >
          {file ? (
            <>
              <CheckCircle className="h-5 w-5 text-success" />
              <span className="text-sm font-medium text-foreground">{file.name}</span>
            </>
          ) : (
            <>
              <Upload className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
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
        {fileError && <p className="text-sm text-destructive">{fileError}</p>}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="brand"
        size="lg"
        className="w-full"
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
