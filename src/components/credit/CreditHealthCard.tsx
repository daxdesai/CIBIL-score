import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { CreditHealthMetric } from "@/lib/mock-data";

export function CreditHealthCard({ metric }: { metric: CreditHealthMetric }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
          <StatusBadge status={metric.status} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-semibold tracking-tight">{metric.value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{metric.description}</p>
      </CardContent>
    </Card>
  );
}
