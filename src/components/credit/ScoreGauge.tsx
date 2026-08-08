"use client";

import { getScoreCategory, getScoreCategoryColor } from "@/lib/score-utils";
import { cn } from "@/lib/utils";

type ScoreGaugeProps = {
  score: number;
  min?: number;
  max?: number;
  size?: "sm" | "lg";
  className?: string;
};

export function ScoreGauge({
  score,
  min = 300,
  max = 900,
  size = "lg",
  className,
}: ScoreGaugeProps) {
  const category = getScoreCategory(score);
  const pct = ((score - min) / (max - min)) * 100;
  const radius = size === "lg" ? 88 : 56;
  const stroke = size === "lg" ? 12 : 8;
  const circumference = 2 * Math.PI * radius;
  const dash = (pct / 100) * circumference * 0.75;
  const dim = (radius + stroke) * 2 + 8;

  return (
    <div className={cn("relative inline-flex flex-col items-center", className)}>
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        className="-rotate-[135deg]"
        aria-hidden
      >
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-muted/60"
          strokeDasharray={`${circumference * 0.75} ${circumference}`}
          strokeLinecap="round"
        />
        <circle
          cx={dim / 2}
          cy={dim / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-primary transition-all duration-700"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
        <span
          className={cn(
            "font-semibold tracking-tight text-foreground",
            size === "lg" ? "text-5xl" : "text-3xl",
          )}
        >
          {score}
        </span>
        <span className={cn("text-sm font-medium", getScoreCategoryColor(category))}>
          {category}
        </span>
      </div>
      <div className="mt-2 flex w-full max-w-[200px] justify-between text-xs text-muted-foreground">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
