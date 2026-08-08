"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppShell";
import { AccountTable } from "@/components/credit/AccountTable";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { EmptyState } from "@/components/shared/EmptyState";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCreditAccounts,
  getAccountsSummary,
  type AccountFilter,
} from "@/services/accounts.service";

export default function CreditAccountsPage() {
  const [filter, setFilter] = useState<AccountFilter>("all");
  const query = useQuery({
    queryKey: ["accounts", filter],
    queryFn: () => getCreditAccounts(filter),
  });
  const summaryQuery = useQuery({
    queryKey: ["accounts-summary"],
    queryFn: getAccountsSummary,
  });

  return (
    <>
      <AppHeader title="Credit accounts" description="Review active and closed credit lines." />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        {summaryQuery.data ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total accounts", value: summaryQuery.data.total },
              { label: "Active", value: summaryQuery.data.active },
              { label: "Closed", value: summaryQuery.data.closed },
              {
                label: "Outstanding balance",
                value: `₹${summaryQuery.data.outstandingBalance.toLocaleString("en-IN")}`,
              },
            ].map((item) => (
              <Card key={item.label}>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  <p className="text-2xl font-semibold">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as AccountFilter)}>
          <TabsList aria-label="Account filters">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
            <TabsTrigger value="credit-cards">Credit Cards</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
          </TabsList>
        </Tabs>
        {query.isLoading ? <LoadingState /> : null}
        {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
        {query.data?.length === 0 ? (
          <EmptyState title="No accounts found" description="Try a different filter." />
        ) : null}
        {query.data && query.data.length > 0 ? (
          <AccountTable accounts={query.data} />
        ) : null}
      </div>
    </>
  );
}
