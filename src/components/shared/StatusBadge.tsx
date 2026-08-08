import { cn } from "@/lib/utils";
import type { ScoreFactor } from "@/lib/mock-data";

const statusStyles: Record<ScoreFactor["status"], string> = {
  Excellent: "bg-emerald-50 text-emerald-800 border-emerald-200",
  "Very Good": "bg-teal-50 text-teal-800 border-teal-200",
  Good: "bg-sky-50 text-sky-800 border-sky-200",
  Fair: "bg-amber-50 text-amber-800 border-amber-200",
  "Needs Attention": "bg-rose-50 text-rose-800 border-rose-200",
};

export function StatusBadge({
  status,
  className,
}: {
  status: ScoreFactor["status"];
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
