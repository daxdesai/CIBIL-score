import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScoreGauge } from "@/components/credit/ScoreGauge";

type ScoreCardProps = {
  score: number;
  lastUpdated: string;
  reportHref?: string;
};

export function ScoreCard({ score, lastUpdated, reportHref = "/credit-report" }: ScoreCardProps) {
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
          Credit Score
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <ScoreGauge score={score} />
        <div className="flex flex-col items-center gap-3 sm:items-end">
          <p className="text-sm text-muted-foreground">
            Last updated:{" "}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
          </p>
          <Button asChild>
            <Link href={reportHref}>
              View Full Credit Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
