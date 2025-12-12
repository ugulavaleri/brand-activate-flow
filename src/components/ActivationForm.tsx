import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { API_BASE } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

interface FormInputs {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  categoryId: string;
}

interface ActivationFormProps {
  onSubmitSuccess: (payload: { data: FormInputs; file: File }) => void;
}

export function ActivationForm({ onSubmitSuccess }: ActivationFormProps) {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<{
    phone?: string;
    email?: string;
    license_file?: string;
    category_id?: string;
    general?: string;
  }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormInputs>();
  const { toast } = useToast();
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoryError(null);
      try {
        const res = await fetch(`${API_BASE}/categories`);
        if (!res.ok) {
          throw new Error("Failed to load categories");
        }
        const data = await res.json();
        const categoriesList = Array.isArray(data) ? data : [];
        setCategories(categoriesList);
      } catch (err) {
        console.error("Category fetch error:", err);
        setCategoryError("ვერ ჩაიტვირთა კატეგორიები");
        toast({
          variant: "destructive",
          description: "Unable to load categories. Please try again.",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [toast]);

  const selectedCategory = watch("categoryId");

  // Set default to first category (Standard) when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setValue("categoryId", String(categories[0].id), {
        shouldValidate: false,
      });
    }
  }, [categories, selectedCategory, setValue]);

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
      if (!file) {
        setFileError("License file is required");
        setIsSubmitting(false);
        return;
      }

      const phone = data.phone.replace(/\s+/g, "");

      const response = await fetch(`${API_BASE}/user/send-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const errors = body?.errors ?? {};

          const fieldErrors = {
            phone: errors.phone?.[0],
            general: body?.message,
          };
          setServerErrors(fieldErrors);
          toast({
            variant: "destructive",
            description:
              fieldErrors.phone || fieldErrors.general || "Failed to send OTP.",
          });
        } else {
          setServerErrors({
            general: "Failed to send OTP. Please try again.",
          });
          toast({
            variant: "destructive",
            description: "Failed to send OTP. Please try again.",
          });
        }
        return;
      }

      toast({
        description: "OTP code sent. Please check your phone.",
      });

      reset();
      setFile(null);
      setFileError(null);
      setServerErrors({});

      onSubmitSuccess({
        data: { ...data, phone },
        file,
      });
    } catch (error) {
      console.error("Submission error:", error);
      setServerErrors({ general: "Unexpected error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {/* First Name */}
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-slate-300"
          >
            {t.form.firstName} {t.form.required}
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="firstName"
              placeholder={t.form.placeholders.firstName}
              className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              {...register("firstName", {
                required: t.form.errors.firstNameRequired,
              })}
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-red-400">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-slate-300"
          >
            {t.form.lastName} {t.form.required}
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              id="lastName"
              placeholder={t.form.placeholders.lastName}
              className="pl-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/20"
              {...register("lastName", {
                required: t.form.errors.lastNameRequired,
              })}
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
        {errors.phone && (
          <p className="text-sm text-red-400">{errors.phone.message}</p>
        )}
        {serverErrors.phone && (
          <p className="text-sm text-red-400">{serverErrors.phone}</p>
        )}
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
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
        {serverErrors.email && (
          <p className="text-sm text-red-400">{serverErrors.email}</p>
        )}
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
              <span className="text-sm font-medium text-white truncate max-w-[200px] block">
                {file.name}
              </span>
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

      {/* Category ID */}
      <div className="space-y-2">
        <Label
          htmlFor="categoryId"
          className="text-sm font-medium text-slate-300"
        >
          Category {t.form.required}
        </Label>
        <input
          type="hidden"
          {...register("categoryId", { required: "Category is required" })}
        />
        <Select
          value={selectedCategory}
          onValueChange={(value) => {
            setValue("categoryId", value, { shouldValidate: true });
            setServerErrors((prev) => ({ ...prev, category_id: undefined }));
          }}
          disabled={isLoadingCategories}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#0f1520] text-white border-white/10">
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={String(cat.id)}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && (
          <p className="text-sm text-red-400">{errors.categoryId.message}</p>
        )}
        {serverErrors.category_id && (
          <p className="text-sm text-red-400">{serverErrors.category_id}</p>
        )}
        {categoryError && (
          <p className="text-sm text-red-400">{categoryError}</p>
        )}
      </div>

      {serverErrors.license_file && (
        <p className="text-sm text-red-400">{serverErrors.license_file}</p>
      )}
      {serverErrors.general && (
        <p className="text-sm text-red-400">{serverErrors.general}</p>
      )}

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
