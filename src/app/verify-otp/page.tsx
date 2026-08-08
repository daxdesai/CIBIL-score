"use client";

import { useEffect, useSyncExternalStore, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlowShell } from "@/components/layout/FlowShell";
import { OTPInput } from "@/components/auth/OTPInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { otpSchema, type OtpFormValues } from "@/lib/validations/auth";
import { maskMobile } from "@/lib/masking";
import { resendOtp, verifyOtp } from "@/services/auth.service";
import { clearFlowCredentials, getFlowMobile } from "@/lib/flow-session";

const RESEND_SECONDS = 30;

export default function VerifyOtpPage() {
  const router = useRouter();
  const mobile = useSyncExternalStore(
    () => () => {},
    getFlowMobile,
    () => null,
  );
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  useEffect(() => {
    if (mobile === null) router.replace("/login");
  }, [mobile, router]);

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const onSubmit = async (values: OtpFormValues) => {
    if (!mobile) return;
    setError(null);
    try {
      await verifyOtp({ mobile, otp: values.otp });
      router.push("/personal-details");
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!mobile || secondsLeft > 0) return;
    await resendOtp(mobile);
    setSecondsLeft(RESEND_SECONDS);
  };

  if (!mobile) return null;

  return (
    <FlowShell
      title="Verify OTP"
      description={`OTP sent to ${maskMobile(mobile)}`}
    >
      <Card className="shadow-sm">
        <CardContent className="space-y-6 pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              control={control}
              name="otp"
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <OTPInput
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isSubmitting}
                  />
                  {fieldState.error ? (
                    <p className="text-center text-sm text-destructive" role="alert">
                      {fieldState.error.message}
                    </p>
                  ) : null}
                </div>
              )}
            />
            {error ? (
              <p className="text-center text-sm text-destructive" role="alert">
                {error}
              </p>
            ) : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify"}
            </Button>
          </form>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <Button
              type="button"
              variant="link"
              disabled={secondsLeft > 0}
              onClick={handleResend}
            >
              {secondsLeft > 0 ? `Resend OTP in ${secondsLeft}s` : "Resend OTP"}
            </Button>
            <Link
              href="/login"
              className="text-primary hover:underline"
              onClick={() => clearFlowCredentials()}
            >
              Change mobile number
            </Link>
          </div>
        </CardContent>
      </Card>
    </FlowShell>
  );
}
