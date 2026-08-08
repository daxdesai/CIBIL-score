"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppShell";
import { ScoreTrendChart } from "@/components/credit/ScoreTrendChart";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getScoreHistory } from "@/services/credit-score.service";

type Range = "6m" | "1y" | "2y";

export default function ScoreHistoryPage() {
  const [range, setRange] = useState<Range>("6m");
  const query = useQuery({
    queryKey: ["score-history", range],
    queryFn: () => getScoreHistory(range),
  });

  return (
    <>
      <AppHeader
        title="Score history"
        description="Track how your illustrative score has changed over time."
      />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <Tabs value={range} onValueChange={(v) => setRange(v as Range)}>
          <TabsList aria-label="History range">
            <TabsTrigger value="6m">6 Months</TabsTrigger>
            <TabsTrigger value="1y">1 Year</TabsTrigger>
            <TabsTrigger value="2y">2 Years</TabsTrigger>
          </TabsList>
        </Tabs>
        {query.isLoading ? <LoadingState /> : null}
        {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
        {query.data ? (
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Credit score trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreTrendChart data={query.data} />
            </CardContent>
          </Card>
        ) : null}
      </div>
    </>
  );
}
