"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { AppHeader } from "@/components/layout/AppShell";
import { ScoreCard } from "@/components/credit/ScoreCard";
import { ScoreTrendChart } from "@/components/credit/ScoreTrendChart";
import { CreditHealthCard } from "@/components/credit/CreditHealthCard";
import { CreditFactorCard } from "@/components/credit/CreditFactorCard";
import { AccountCard } from "@/components/credit/AccountCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getCreditScore, getScoreHistory } from "@/services/credit-score.service";
import { getCreditHealthOverview, getScoreFactors } from "@/services/credit-factors.service";
import { getCreditAccounts } from "@/services/accounts.service";
import { getCreditEnquiries } from "@/services/enquiries.service";
import { getGreetingName } from "@/lib/score-utils";
import { useAuth } from "@/providers/auth-provider";

export default function DashboardPage() {
  const { customer } = useAuth();
  const greeting = getGreetingName(new Date().getHours());
  const firstName = customer.fullName.split(" ")[0];

  const scoreQuery = useQuery({ queryKey: ["credit-score"], queryFn: getCreditScore });
  const historyQuery = useQuery({
    queryKey: ["score-history", "6m"],
    queryFn: () => getScoreHistory("6m"),
  });
  const healthQuery = useQuery({
    queryKey: ["credit-health"],
    queryFn: getCreditHealthOverview,
  });
  const factorsQuery = useQuery({ queryKey: ["score-factors"], queryFn: getScoreFactors });
  const accountsQuery = useQuery({
    queryKey: ["accounts", "all"],
    queryFn: () => getCreditAccounts("all"),
  });
  const enquiriesQuery = useQuery({
    queryKey: ["enquiries"],
    queryFn: getCreditEnquiries,
  });

  const isLoading =
    scoreQuery.isLoading ||
    historyQuery.isLoading ||
    healthQuery.isLoading ||
    factorsQuery.isLoading;

  const isError =
    scoreQuery.isError ||
    historyQuery.isError ||
    healthQuery.isError ||
    factorsQuery.isError;

  const refetchAll = () => {
    scoreQuery.refetch();
    historyQuery.refetch();
    healthQuery.refetch();
    factorsQuery.refetch();
    accountsQuery.refetch();
    enquiriesQuery.refetch();
  };

  return (
    <>
      <AppHeader
        title={`${greeting}, ${firstName}`}
        description="Here's your credit health overview."
      />
      <div className="flex-1 space-y-8 p-4 sm:p-6">
        {isLoading ? <LoadingState message="Loading your dashboard..." /> : null}
        {isError ? (
          <ErrorState onRetry={refetchAll} />
        ) : null}
        {scoreQuery.data && historyQuery.data && healthQuery.data && factorsQuery.data ? (
          <>
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <ScoreCard
                  score={scoreQuery.data.score}
                  lastUpdated={scoreQuery.data.lastUpdated}
                />
              </div>
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Score change</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center gap-1 text-2xl font-semibold text-emerald-700">
                    +{scoreQuery.data.changeSinceLast} points
                    <ArrowUpRight className="h-5 w-5" aria-hidden />
                  </p>
                  <p className="text-sm text-muted-foreground">Since your previous update</p>
                  <ScoreTrendChart data={historyQuery.data} compact />
                </CardContent>
              </Card>
            </div>

            <section aria-labelledby="health-overview">
              <h2 id="health-overview" className="mb-4 text-lg font-semibold">
                Credit health overview
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {healthQuery.data.map((metric) => (
                  <CreditHealthCard key={metric.id} metric={metric} />
                ))}
              </div>
            </section>

            <section aria-labelledby="score-factors">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 id="score-factors" className="text-lg font-semibold">
                  What is affecting your score?
                </h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/score-factors">View all</Link>
                </Button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {factorsQuery.data.map((factor) => (
                  <CreditFactorCard key={factor.id} factor={factor} />
                ))}
              </div>
            </section>

            <section aria-labelledby="accounts-preview">
              <div className="mb-4 flex items-center justify-between">
                <h2 id="accounts-preview" className="text-lg font-semibold">
                  Credit accounts
                </h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/credit-accounts">View all</Link>
                </Button>
              </div>
              {accountsQuery.data ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {accountsQuery.data.slice(0, 2).map((account) => (
                    <AccountCard key={account.id} account={account} />
                  ))}
                </div>
              ) : null}
            </section>

            <section aria-labelledby="enquiries-preview">
              <div className="mb-4 flex items-center justify-between">
                <h2 id="enquiries-preview" className="text-lg font-semibold">
                  Recent enquiries
                </h2>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/credit-enquiries">View all</Link>
                </Button>
              </div>
              {enquiriesQuery.data ? (
                <Card className="shadow-sm">
                  <CardContent className="divide-y pt-6">
                    {enquiriesQuery.data.slice(0, 3).map((enquiry) => (
                      <div
                        key={enquiry.id}
                        className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div>
                          <p className="font-medium">{enquiry.institution}</p>
                          <p className="text-sm text-muted-foreground">
                            {enquiry.enquiryType}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">{enquiry.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : null}
            </section>
          </>
        ) : null}
      </div>
    </>
  );
}
