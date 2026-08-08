"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlowShell } from "@/components/layout/FlowShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  personalDetailsSchema,
  type PersonalDetailsFormValues,
} from "@/lib/validations/auth";
import { useAuth } from "@/providers/auth-provider";
import { getFlowMobile } from "@/lib/flow-session";

export default function PersonalDetailsPage() {
  const router = useRouter();
  const { updateCustomer } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PersonalDetailsFormValues>({
    resolver: zodResolver(personalDetailsSchema),
  });

  useEffect(() => {
    const mobile = getFlowMobile();
    if (!mobile) {
      router.replace("/login");
      return;
    }
    setValue("mobile", mobile);
  }, [router, setValue]);

  const onSubmit = (values: PersonalDetailsFormValues) => {
    updateCustomer({
      fullName: values.fullName,
      dateOfBirth: values.dateOfBirth,
      pan: values.pan,
      mobile: values.mobile,
      email: values.email,
      address: values.address,
      pinCode: values.pinCode,
    });
    router.push("/consent");
  };

  return (
    <FlowShell
      title="Personal details"
      description="Provide information as per your bank and bureau records."
    >
      <Card className="shadow-sm">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(
              [
                ["fullName", "Full name", "text"],
                ["dateOfBirth", "Date of birth", "date"],
                ["pan", "PAN", "text"],
                ["mobile", "Mobile number", "tel"],
                ["email", "Email", "email"],
              ] as const
            ).map(([name, label, type]) => (
              <div key={name} className="space-y-2">
                <Label htmlFor={name}>{label}</Label>
                <Input
                  id={name}
                  type={type}
                  aria-invalid={Boolean(errors[name])}
                  {...register(name)}
                  readOnly={name === "mobile"}
                  className={name === "mobile" ? "bg-muted" : undefined}
                />
                {errors[name] ? (
                  <p className="text-sm text-destructive" role="alert">
                    {errors[name]?.message}
                  </p>
                ) : null}
              </div>
            ))}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" rows={3} {...register("address")} />
              {errors.address ? (
                <p className="text-sm text-destructive" role="alert">
                  {errors.address.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN code</Label>
              <Input id="pinCode" inputMode="numeric" maxLength={6} {...register("pinCode")} />
              {errors.pinCode ? (
                <p className="text-sm text-destructive" role="alert">
                  {errors.pinCode.message}
                </p>
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </FlowShell>
  );
}
