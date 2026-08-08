"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ScoreHistoryPoint } from "@/lib/mock-data";

type ScoreTrendChartProps = {
  data: ScoreHistoryPoint[];
  compact?: boolean;
};

export function ScoreTrendChart({ data, compact }: ScoreTrendChartProps) {
  return (
    <div className={compact ? "h-[120px] w-full" : "h-[280px] w-full"}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          {!compact ? <CartesianGrid strokeDasharray="3 3" className="stroke-muted" /> : null}
          <XAxis
            dataKey="label"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          {!compact ? (
            <YAxis domain={[650, 900]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          ) : null}
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid var(--border)",
              fontSize: "12px",
            }}
            formatter={(value) => [`${value ?? ""}`, "Score"]}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={{ r: compact ? 2 : 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
