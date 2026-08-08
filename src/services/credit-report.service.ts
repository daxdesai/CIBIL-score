import { mockCreditReport } from "@/lib/mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getCreditReport() {
  await delay(700);
  return mockCreditReport;
}

export async function downloadCreditReport(): Promise<{ filename: string; blob: Blob }> {
  await delay(1200);
  const content = [
    "CREDIT REPORT (DEMO)",
    "====================",
    `Score: ${mockCreditReport.creditSummary.score}`,
    `Generated: ${new Date().toISOString()}`,
    "",
    "This is a demonstration document. Not an official bureau report.",
  ].join("\n");
  const blob = new Blob([content], { type: "application/pdf" });
  return { filename: "credit-report-demo.txt", blob };
}
