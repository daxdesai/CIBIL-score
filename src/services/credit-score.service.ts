import {
  mockCreditScore,
  mockScoreHistory,
  type CreditScoreSnapshot,
  type ScoreHistoryPoint,
} from "@/lib/mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCreditScore(): Promise<CreditScoreSnapshot> {
  await delay(600);
  return mockCreditScore;
}

export async function getScoreHistory(
  range: "6m" | "1y" | "2y" = "6m",
): Promise<ScoreHistoryPoint[]> {
  await delay(500);
  if (range === "6m") return mockScoreHistory.slice(-6);
  if (range === "1y") return mockScoreHistory;
  return [
    ...mockScoreHistory.map((p, i) => ({
      ...p,
      score: p.score - (8 - i) * 2,
      label: p.label,
    })),
  ];
}

export type FetchScoreResult = {
  score: CreditScoreSnapshot;
  history: ScoreHistoryPoint[];
};

export async function fetchCreditProfile(): Promise<FetchScoreResult> {
  await delay(2500);
  const [score, history] = await Promise.all([
    getCreditScore(),
    getScoreHistory("6m"),
  ]);
  return { score, history };
}
