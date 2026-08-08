import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MaskedValue } from "@/components/shared/MaskedValue";
import type { CreditAccount } from "@/lib/mock-data";

function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function AccountCard({ account }: { account: CreditAccount }) {
  const statusMap = {
    "On Time": "Excellent",
    Late: "Needs Attention",
    Closed: "Good",
  } as const;

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-base">{account.institution}</CardTitle>
            <p className="text-sm text-muted-foreground">{account.accountType}</p>
          </div>
          <StatusBadge
            status={account.accountStatus === "Active" ? "Good" : "Fair"}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Account</span>
          <MaskedValue value={account.accountNumberMasked} />
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Outstanding</span>
          <span className="font-medium">{formatInr(account.currentBalance)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Payments</span>
          <StatusBadge status={statusMap[account.paymentStatus]} />
        </div>
      </CardContent>
    </Card>
  );
}
