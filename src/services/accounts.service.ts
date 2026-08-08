import { mockCreditAccounts, type CreditAccount } from "@/lib/mock-data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type AccountFilter =
  | "all"
  | "active"
  | "closed"
  | "credit-cards"
  | "loans";

export async function getCreditAccounts(
  filter: AccountFilter = "all",
): Promise<CreditAccount[]> {
  await delay(500);
  let accounts = [...mockCreditAccounts];
  switch (filter) {
    case "active":
      accounts = accounts.filter((a) => a.accountStatus === "Active");
      break;
    case "closed":
      accounts = accounts.filter((a) => a.accountStatus === "Closed");
      break;
    case "credit-cards":
      accounts = accounts.filter((a) => a.accountType === "Credit Card");
      break;
    case "loans":
      accounts = accounts.filter((a) => a.accountType !== "Credit Card");
      break;
  }
  return accounts;
}

export async function getAccountsSummary() {
  await delay(400);
  const accounts = mockCreditAccounts;
  return {
    total: accounts.length,
    active: accounts.filter((a) => a.accountStatus === "Active").length,
    closed: accounts.filter((a) => a.accountStatus === "Closed").length,
    outstandingBalance: accounts.reduce((s, a) => s + a.currentBalance, 0),
  };
}
