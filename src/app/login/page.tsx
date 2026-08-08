"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlowShell } from "@/components/layout/FlowShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { loginSchema, type LoginFormValues } from "@/lib/validations/auth";
import { requestOtp } from "@/services/auth.service";
import { setFlowCredentials } from "@/lib/flow-session";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { mobile: "", customerId: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError(null);
    try {
      await requestOtp(values);
      setFlowCredentials(values.mobile, values.customerId);
      router.push("/verify-otp");
    } catch {
      setError("Unable to send OTP. Please try again.");
    }
  };

  return (
    <FlowShell
      title="Sign in to continue"
      description="Enter your registered mobile number to receive a one-time password."
    >
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile number</Label>
              <Input
                id="mobile"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                maxLength={10}
                aria-invalid={Boolean(errors.mobile)}
                aria-describedby={errors.mobile ? "mobile-error" : undefined}
                {...register("mobile")}
              />
              {errors.mobile ? (
                <p id="mobile-error" className="text-sm text-destructive" role="alert">
                  {errors.mobile.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer ID (optional)</Label>
              <Input
                id="customerId"
                autoComplete="off"
                placeholder="Bank customer ID"
                {...register("customerId")}
              />
            </div>
            {error ? (
              <p className="text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Continuing..." : "Continue"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </FlowShell>
  );
}
