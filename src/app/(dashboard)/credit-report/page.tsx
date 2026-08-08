"use client";

import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { AppHeader } from "@/components/layout/AppShell";
import { AccountTable } from "@/components/credit/AccountTable";
import { EnquiryTable } from "@/components/credit/EnquiryTable";
import { CreditFactorCard } from "@/components/credit/CreditFactorCard";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { MaskedValue } from "@/components/shared/MaskedValue";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCreditReport, downloadCreditReport } from "@/services/credit-report.service";
import { maskPan, maskMobile } from "@/lib/masking";

export default function CreditReportPage() {
  const query = useQuery({ queryKey: ["credit-report"], queryFn: getCreditReport });

  const handleDownload = async () => {
    const { blob, filename } = await downloadCreditReport();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <AppHeader
        title="Credit report"
        description="Detailed view of your illustrative credit profile."
      />
      <div className="flex-1 space-y-6 p-4 sm:p-6">
        <div className="flex justify-end">
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Credit Report
          </Button>
        </div>
        {query.isLoading ? <LoadingState /> : null}
        {query.isError ? <ErrorState onRetry={() => query.refetch()} /> : null}
        {query.data ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm sm:grid-cols-2">
                <p>
                  <span className="text-muted-foreground">Name: </span>
                  {query.data.personalInformation.fullName}
                </p>
                <p>
                  <span className="text-muted-foreground">PAN: </span>
                  <MaskedValue value={maskPan(query.data.personalInformation.pan)} />
                </p>
                <p>
                  <span className="text-muted-foreground">Mobile: </span>
                  <MaskedValue
                    value={maskMobile(query.data.personalInformation.mobile)}
                  />
                </p>
                <p>
                  <span className="text-muted-foreground">Email: </span>
                  {query.data.personalInformation.email}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Credit summary</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-3">
                <p>Score: {query.data.creditSummary.score}</p>
                <p>Active accounts: {query.data.creditSummary.activeAccounts}</p>
                <p>Total enquiries: {query.data.creditSummary.totalEnquiries}</p>
                <p>
                  Outstanding: ₹
                  {query.data.creditSummary.outstandingBalance.toLocaleString("en-IN")}
                </p>
              </CardContent>
            </Card>
            <section>
              <h2 className="mb-3 text-lg font-semibold">Credit accounts</h2>
              <AccountTable accounts={query.data.accounts} />
            </section>
            <Card>
              <CardHeader>
                <CardTitle>Payment history</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {query.data.paymentHistorySummary}
              </CardContent>
            </Card>
            <section>
              <h2 className="mb-3 text-lg font-semibold">Credit enquiries</h2>
              <EnquiryTable enquiries={query.data.enquiries} />
            </section>
            <Card>
              <CardHeader>
                <CardTitle>Public information</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {query.data.publicInformation.length === 0
                  ? "No public records reported in this demo profile."
                  : null}
              </CardContent>
            </Card>
            <section>
              <h2 className="mb-3 text-lg font-semibold">Score factors</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {query.data.factors.map((f) => (
                  <CreditFactorCard key={f.id} factor={f} />
                ))}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </>
  );
}
