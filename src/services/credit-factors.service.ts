import {
  mockCreditHealthOverview,
  mockImprovementPlan,
  mockScoreFactors,
} from "@/lib/mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getScoreFactors() {
  await delay(500);
  return mockScoreFactors;
}

export async function getCreditHealthOverview() {
  await delay(450);
  return mockCreditHealthOverview;
}

export async function getImprovementPlan() {
  await delay(450);
  return mockImprovementPlan;
}

export type UtilizationDetail = {
  usedCredit: number;
  availableCredit: number;
  utilizationPercent: number;
};

export async function getUtilizationDetail(): Promise<UtilizationDetail> {
  await delay(300);
  return {
    usedCredit: 45000,
    availableCredit: 150000,
    utilizationPercent: 30,
  };
}

export async function getCreditAgeDetail() {
  await delay(300);
  return { averageAge: "4 years 8 months" };
}

export async function getCreditMixDetail() {
  await delay(300);
  return {
    securedLoans: 2,
    unsecuredLoans: 1,
    creditCards: 2,
  };
}
