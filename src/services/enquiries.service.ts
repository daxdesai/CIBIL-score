import { mockCreditEnquiries, type CreditEnquiry } from "@/lib/mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCreditEnquiries(): Promise<CreditEnquiry[]> {
  await delay(500);
  return mockCreditEnquiries;
}

export async function getEnquiriesSummary() {
  await delay(400);
  return {
    total: mockCreditEnquiries.length,
    recent: mockCreditEnquiries.filter((e) => {
      const d = new Date(e.date);
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
      return d >= sixMonthsAgo;
    }).length,
  };
}
