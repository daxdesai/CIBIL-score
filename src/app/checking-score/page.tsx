"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Circle, Loader2 } from "lucide-react";
import { FlowShell } from "@/components/layout/FlowShell";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/providers/auth-provider";
import { fetchCreditProfile } from "@/services/credit-score.service";
import {
  clearFlowCredentials,
  getFlowCustomerId,
  getFlowMobile,
} from "@/lib/flow-session";

const steps = [
  { id: 1, label: "Identity verified" },
  { id: 2, label: "Request submitted" },
  { id: 3, label: "Fetching credit information" },
  { id: 4, label: "Preparing your report" },
];

export default function CheckingScorePage() {
  const router = useRouter();
  const { login } = useAuth();
  const [activeStep, setActiveStep] = useState(2);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mobile = getFlowMobile();
    if (!mobile) {
      router.replace("/login");
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setActiveStep(2);
        await new Promise((r) => setTimeout(r, 600));
        setActiveStep(3);
        await fetchCreditProfile();
        setActiveStep(4);
        await new Promise((r) => setTimeout(r, 500));
        if (cancelled) return;
        login({
          mobile,
          customerId: getFlowCustomerId() ?? undefined,
          verifiedAt: new Date().toISOString(),
        });
        clearFlowCredentials();
        router.replace("/dashboard");
      } catch {
        if (!cancelled) {
          setError(
            "We couldn't retrieve your credit information right now. Please try again.",
          );
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [login, router]);

  return (
    <FlowShell title="Checking your credit profile..." description="Please wait a moment.">
      <Card className="shadow-sm">
        <CardContent className="space-y-6 pt-8 pb-8">
          <div className="flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" aria-hidden />
          </div>
          <ol className="space-y-4" aria-live="polite">
            {steps.map((step) => {
              const done = step.id < activeStep;
              const current = step.id === activeStep;
              return (
                <li key={step.id} className="flex items-center gap-3 text-sm">
                  {done ? (
                    <Check className="h-5 w-5 text-emerald-600" aria-hidden />
                  ) : current ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary" aria-hidden />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground/40" aria-hidden />
                  )}
                  <span className={current ? "font-medium" : "text-muted-foreground"}>
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
          {error ? (
            <p className="text-center text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </CardContent>
      </Card>
    </FlowShell>
  );
}
