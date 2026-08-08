"use client";

import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppShell";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getImprovementPlan } from "@/services/credit-factors.service";

const recommendations = [
  "Pay EMIs and credit card bills on time.",
  "Keep credit utilization under control.",
  "Avoid unnecessary credit applications.",
  "Review your credit report regularly.",
  "Maintain a healthy mix of credit over time.",
];

export default function ImprovementPlanPage() {
  const query = useQuery({ queryKey: ["improvement-plan"], queryFn: getImprovementPlan });

  return (
    <>
      <AppHeader
        title="Your Credit Improvement Plan"
        description="Practical steps to strengthen your credit profile over time."
      />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Recommended actions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
              {recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </CardContent>
        </Card>
        {query.isLoading ? <LoadingState /> : null}
        {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
        {query.data ? (
          <div className="grid gap-4 md:grid-cols-3">
            {query.data.map((item) => (
              <Card key={item.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <StatusBadge status={item.status} />
                </CardHeader>
                <CardContent className="space-y-3">
                  <ProgressBar value={item.healthPercent} label="Health" />
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}
