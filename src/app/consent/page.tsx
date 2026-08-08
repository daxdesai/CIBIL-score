"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlowShell } from "@/components/layout/FlowShell";
import { ConsentCard } from "@/components/auth/ConsentCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { consentSchema, type ConsentFormValues } from "@/lib/validations/auth";

export default function ConsentPage() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ConsentFormValues>({
    resolver: zodResolver(consentSchema),
    defaultValues: { consent: false },
  });

  const onSubmit = () => {
    router.push("/checking-score");
  };

  return (
    <FlowShell
      title="Consent to Access Credit Information"
      description="Please review and confirm before we retrieve your credit profile."
    >
      <div className="space-y-4">
        <ConsentCard />
        <Card className="shadow-sm">
          <CardContent className="space-y-4 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Controller
                control={control}
                name="consent"
                render={({ field }) => (
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      checked={field.value}
                      onCheckedChange={(v) => field.onChange(v === true)}
                      aria-invalid={Boolean(errors.consent)}
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed font-normal">
                      I consent to BankName accessing my credit information for this
                      session. I have read the{" "}
                      <Link href="/help" className="text-primary underline">
                        Privacy Information
                      </Link>{" "}
                      and{" "}
                      <Link href="/help" className="text-primary underline">
                        Terms
                      </Link>
                      .
                    </Label>
                  </div>
                )}
              />
              {errors.consent ? (
                <p className="text-sm text-destructive" role="alert">
                  {errors.consent.message}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Continue Securely
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </FlowShell>
  );
}
