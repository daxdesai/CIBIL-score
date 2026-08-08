import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressBar } from "@/components/shared/ProgressBar";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { ScoreFactor } from "@/lib/mock-data";

export function CreditFactorCard({ factor }: { factor: ScoreFactor }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">{factor.name}</CardTitle>
        <StatusBadge status={factor.status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <ProgressBar value={factor.scorePercent} label="Health indicator" />
        <p className="text-sm text-muted-foreground">{factor.summary}</p>
      </CardContent>
    </Card>
  );
}
