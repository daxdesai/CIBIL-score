"use client";

import { useQuery } from "@tanstack/react-query";
import { AppHeader } from "@/components/layout/AppShell";
import { EnquiryTable } from "@/components/credit/EnquiryTable";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { getCreditEnquiries, getEnquiriesSummary } from "@/services/enquiries.service";

export default function CreditEnquiriesPage() {
  const query = useQuery({ queryKey: ["enquiries"], queryFn: getCreditEnquiries });
  const summaryQuery = useQuery({
    queryKey: ["enquiries-summary"],
    queryFn: getEnquiriesSummary,
  });

  return (
    <>
      <AppHeader title="Credit enquiries" description="Hard enquiry history on your profile." />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <Alert>
          <AlertTitle>About credit enquiries</AlertTitle>
          <AlertDescription>
            Multiple credit applications in a short period may affect how lenders view your
            credit profile. Individual score impact varies by bureau and overall credit
            history.
          </AlertDescription>
        </Alert>
        {summaryQuery.data ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Total enquiries</p>
                <p className="text-2xl font-semibold">{summaryQuery.data.total}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">Recent (6 months)</p>
                <p className="text-2xl font-semibold">{summaryQuery.data.recent}</p>
              </CardContent>
            </Card>
          </div>
        ) : null}
        {query.isLoading ? <LoadingState /> : null}
        {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
        {query.data ? <EnquiryTable enquiries={query.data} /> : null}
      </div>
    </>
  );
}
