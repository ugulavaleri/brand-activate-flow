import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, User, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const formSchema = z.object({
  firstName: z.string().min(1, "სახელი აუცილებელია").max(50, "სახელი ძალიან გრძელია"),
  lastName: z.string().min(1, "გვარი აუცილებელია").max(50, "გვარი ძალიან გრძელია"),
  phone: z
    .string()
    .min(1, "ტელეფონის ნომერი აუცილებელია")
    .regex(/^[\d\s\+\-\(\)]+$/, "ტელეფონის ნომერი არასწორია"),
  email: z.string().min(1, "ელ. ფოსტა აუცილებელია").email("გთხოვთ შეიყვანოთ სწორი ელ. ფოსტა"),
});

type FormData = z.infer<typeof formSchema>;

interface ActivationFormProps {
  onSubmitSuccess: (data: FormData) => void;
}

export function ActivationForm({ onSubmitSuccess }: ActivationFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverErrors, setServerErrors] = useState<{ phone?: string; email?: string }>({});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFileError(null);

    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setFileError("ფაილის ზომა არ უნდა აღემატებოდეს 10 MB-ს");
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setServerErrors({});

    try {
      // Simulate API call - Replace with actual API endpoint
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      if (file) {
        formData.append("license", file);
      }

      // Mock API response - In production, replace with:
      // const response = await fetch('/activation-request', { method: 'POST', body: formData });
      // const result = await response.json();
      
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock server validation errors (uncomment to test)
      // setServerErrors({ phone: "This phone number is already registered." });
      // setServerErrors({ email: "This email is already registered." });

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
            სახელი *
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="გიორგი"
              className="pl-11"
              error={!!errors.firstName}
              {...register("firstName")}
            />
          </div>
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-semibold text-foreground">
            გვარი *
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lastName"
              placeholder="ბერიძე"
              className="pl-11"
              error={!!errors.lastName}
              {...register("lastName")}
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
          ტელეფონის ნომერი *
        </Label>
        <div className="relative">
          <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone"
            type="tel"
            placeholder="+995 5XX XXX XXX"
            className="pl-11"
            error={!!errors.phone || !!serverErrors.phone}
            {...register("phone")}
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
          ელ. ფოსტა *
        </Label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            className="pl-11"
            error={!!errors.email || !!serverErrors.email}
            {...register("email")}
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
          მართვის მოწმობა
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
                ატვირთეთ მართვის მოწმობა (მაქს. 10 MB)
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
            მიმდინარეობს...
          </>
        ) : (
          "რეგისტრაცია"
        )}
      </Button>
    </form>
  );
}
