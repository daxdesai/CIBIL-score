import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export function ConsentCard() {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-primary" aria-hidden />
          <CardTitle className="text-lg">Why we need your consent</CardTitle>
        </div>
        <CardDescription>
          To retrieve your credit information, we need your explicit consent as required
          for credit bureau access in India.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>We use your details only to fetch your credit profile for this session.</p>
        <p>
          Data is transmitted over secure channels. This demo does not connect to live
          bureau systems.
        </p>
      </CardContent>
    </Card>
  );
}
