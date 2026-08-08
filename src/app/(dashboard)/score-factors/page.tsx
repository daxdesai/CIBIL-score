"use client";

import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppShell";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getScoreFactors,
  getUtilizationDetail,
  getCreditAgeDetail,
  getCreditMixDetail,
} from "@/services/credit-factors.service";
import { getCreditEnquiries } from "@/services/enquiries.service";

export default function ScoreFactorsPage() {
  const factorsQuery = useQuery({ queryKey: ["score-factors"], queryFn: getScoreFactors });
  const utilQuery = useQuery({
    queryKey: ["utilization-detail"],
    queryFn: getUtilizationDetail,
  });
  const ageQuery = useQuery({ queryKey: ["credit-age"], queryFn: getCreditAgeDetail });
  const mixQuery = useQuery({ queryKey: ["credit-mix"], queryFn: getCreditMixDetail });
  const enquiriesQuery = useQuery({ queryKey: ["enquiries"], queryFn: getCreditEnquiries });

  const loading = factorsQuery.isLoading || utilQuery.isLoading;

  return (
    <>
      <AppHeader
        title="Score factors"
        description="Understand what contributes to your illustrative credit profile."
      />
      <div className="flex-1 space-y-8 p-4 sm:p-6">
        {loading ? <LoadingState /> : null}
        {factorsQuery.isError ? (
          <ErrorState onRetry={() => factorsQuery.refetch()} />
        ) : null}
        {factorsQuery.data ? (
          <div className="grid gap-4 md:grid-cols-2">
            {factorsQuery.data.map((factor) => (
              <Card key={factor.id} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">{factor.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <ProgressBar value={factor.scorePercent} />
                  <p className="text-muted-foreground">{factor.summary}</p>
                  <p>
                    <span className="font-medium">Recommendation: </span>
                    {factor.recommendation}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {utilQuery.data ? (
          <Card>
            <CardHeader>
              <CardTitle>Credit utilization detail</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm sm:grid-cols-3">
              <p>
                Used credit: ₹{utilQuery.data.usedCredit.toLocaleString("en-IN")}
              </p>
              <p>
                Available credit: ₹
                {utilQuery.data.availableCredit.toLocaleString("en-IN")}
              </p>
              <p>Utilization: {utilQuery.data.utilizationPercent}%</p>
            </CardContent>
          </Card>
        ) : null}

        {ageQuery.data ? (
          <Card>
            <CardHeader>
              <CardTitle>Credit age</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              Average account age: {ageQuery.data.averageAge}
            </CardContent>
          </Card>
        ) : null}

        {mixQuery.data ? (
          <Card>
            <CardHeader>
              <CardTitle>Credit mix</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm sm:grid-cols-3">
              <p>Secured loans: {mixQuery.data.securedLoans}</p>
              <p>Unsecured loans: {mixQuery.data.unsecuredLoans}</p>
              <p>Credit cards: {mixQuery.data.creditCards}</p>
            </CardContent>
          </Card>
        ) : null}

        {enquiriesQuery.data ? (
          <Card>
            <CardHeader>
              <CardTitle>Recent enquiries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {enquiriesQuery.data.map((e) => (
                <div key={e.id} className="flex justify-between border-b border-border py-2 last:border-0">
                  <span>
                    {e.institution} — {e.enquiryType}
                  </span>
                  <span className="text-muted-foreground">{e.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
}
