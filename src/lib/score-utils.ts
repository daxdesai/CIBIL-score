export type ScoreCategory =
  | "Poor"
  | "Fair"
  | "Good"
  | "Very Good"
  | "Excellent";

/** Illustrative ranges for demo UI — not official bureau classifications. */
export function getScoreCategory(score: number): ScoreCategory {
  if (score >= 800) return "Excellent";
  if (score >= 740) return "Very Good";
  if (score >= 670) return "Good";
  if (score >= 580) return "Fair";
  return "Poor";
}

export function getScoreCategoryColor(category: ScoreCategory): string {
  switch (category) {
    case "Excellent":
      return "text-emerald-700";
    case "Very Good":
      return "text-teal-700";
    case "Good":
      return "text-sky-700";
    case "Fair":
      return "text-amber-700";
    case "Poor":
      return "text-rose-700";
  }
}

export function getGreetingName(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}
