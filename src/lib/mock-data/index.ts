export type CustomerProfile = {
  id: string;
  fullName: string;
  dateOfBirth: string;
  pan: string;
  mobile: string;
  email: string;
  address: string;
  pinCode: string;
  customerId?: string;
};

export const mockCustomer: CustomerProfile = {
  id: "cust-demo-001",
  fullName: "Priya Sharma",
  dateOfBirth: "1992-06-15",
  pan: "ABCDE1234F",
  mobile: "9876543210",
  email: "priya.sharma@email.example",
  address: "42, Green Park Extension, New Delhi",
  pinCode: "110016",
  customerId: "BNK7845921",
};

export type CreditScoreSnapshot = {
  score: number;
  category: string;
  lastUpdated: string;
  changeSinceLast: number;
  previousScore: number;
};

export const mockCreditScore: CreditScoreSnapshot = {
  score: 782,
  category: "Very Good",
  lastUpdated: "2026-08-08",
  changeSinceLast: 12,
  previousScore: 770,
};

export type ScoreHistoryPoint = {
  month: string;
  score: number;
  label: string;
};

export const mockScoreHistory: ScoreHistoryPoint[] = [
  { month: "2025-01", score: 748, label: "Jan" },
  { month: "2025-02", score: 755, label: "Feb" },
  { month: "2025-03", score: 761, label: "Mar" },
  { month: "2025-04", score: 770, label: "Apr" },
  { month: "2025-05", score: 770, label: "May" },
  { month: "2025-06", score: 776, label: "Jun" },
  { month: "2025-07", score: 770, label: "Jul" },
  { month: "2025-08", score: 782, label: "Aug" },
];

export type CreditAccount = {
  id: string;
  institution: string;
  accountType: "Credit Card" | "Personal Loan" | "Home Loan" | "Auto Loan";
  accountNumberMasked: string;
  openDate: string;
  creditLimit?: number;
  currentBalance: number;
  paymentStatus: "On Time" | "Late" | "Closed";
  accountStatus: "Active" | "Closed";
};

export const mockCreditAccounts: CreditAccount[] = [
  {
    id: "acc-1",
    institution: "HDFC Bank",
    accountType: "Credit Card",
    accountNumberMasked: "XXXX XXXX 4521",
    openDate: "2019-03-12",
    creditLimit: 150000,
    currentBalance: 42500,
    paymentStatus: "On Time",
    accountStatus: "Active",
  },
  {
    id: "acc-2",
    institution: "State Bank of India",
    accountType: "Personal Loan",
    accountNumberMasked: "XXXX XXXX 8834",
    openDate: "2021-08-01",
    creditLimit: 500000,
    currentBalance: 125000,
    paymentStatus: "On Time",
    accountStatus: "Active",
  },
  {
    id: "acc-3",
    institution: "ICICI Bank",
    accountType: "Credit Card",
    accountNumberMasked: "XXXX XXXX 2290",
    openDate: "2018-11-20",
    creditLimit: 100000,
    currentBalance: 2500,
    paymentStatus: "On Time",
    accountStatus: "Active",
  },
  {
    id: "acc-4",
    institution: "Axis Bank",
    accountType: "Auto Loan",
    accountNumberMasked: "XXXX XXXX 6612",
    openDate: "2017-05-05",
    creditLimit: 800000,
    currentBalance: 0,
    paymentStatus: "Closed",
    accountStatus: "Closed",
  },
];

export type CreditEnquiry = {
  id: string;
  institution: string;
  date: string;
  enquiryType: string;
  amount?: number;
  status: "Completed" | "Pending";
};

export const mockCreditEnquiries: CreditEnquiry[] = [
  {
    id: "enq-1",
    institution: "HDFC Bank",
    date: "2026-07-12",
    enquiryType: "Credit Card",
    amount: 150000,
    status: "Completed",
  },
  {
    id: "enq-2",
    institution: "Bajaj Finance",
    date: "2026-05-03",
    enquiryType: "Personal Loan",
    amount: 300000,
    status: "Completed",
  },
  {
    id: "enq-3",
    institution: "IndusInd Bank",
    date: "2026-02-18",
    enquiryType: "Credit Card",
    amount: 100000,
    status: "Completed",
  },
];

export type ScoreFactor = {
  id: string;
  name: string;
  status: "Excellent" | "Very Good" | "Good" | "Fair" | "Needs Attention";
  impact: "High" | "Medium" | "Low";
  scorePercent: number;
  summary: string;
  recommendation: string;
};

export const mockScoreFactors: ScoreFactor[] = [
  {
    id: "payment-history",
    name: "Payment History",
    status: "Excellent",
    impact: "High",
    scorePercent: 95,
    summary: "You have consistently paid EMIs and card dues on time.",
    recommendation: "Continue paying at least the minimum due before the due date.",
  },
  {
    id: "credit-utilization",
    name: "Credit Utilization",
    status: "Good",
    impact: "High",
    scorePercent: 72,
    summary: "Your overall utilization is within a reasonable range.",
    recommendation: "Aim to keep utilization below 30% across cards.",
  },
  {
    id: "credit-age",
    name: "Credit Age",
    status: "Very Good",
    impact: "Medium",
    scorePercent: 85,
    summary: "Average account age reflects a stable credit history.",
    recommendation: "Keep older accounts open when possible.",
  },
  {
    id: "credit-mix",
    name: "Credit Mix",
    status: "Good",
    impact: "Medium",
    scorePercent: 78,
    summary: "You have a mix of secured and unsecured credit.",
    recommendation: "Maintain diversity without taking unnecessary new credit.",
  },
  {
    id: "recent-enquiries",
    name: "Recent Enquiries",
    status: "Needs Attention",
    impact: "Low",
    scorePercent: 55,
    summary: "Several enquiries were recorded in recent months.",
    recommendation: "Space out credit applications to avoid frequent hard enquiries.",
  },
];

export type CreditHealthMetric = {
  id: string;
  title: string;
  value: string;
  status: ScoreFactor["status"];
  description: string;
};

export const mockCreditHealthOverview: CreditHealthMetric[] = [
  {
    id: "ph",
    title: "Payment History",
    value: "98%",
    status: "Excellent",
    description: "On-time payments across active accounts",
  },
  {
    id: "cu",
    title: "Credit Utilization",
    value: "30%",
    status: "Good",
    description: "Used credit vs total available limit",
  },
  {
    id: "ca",
    title: "Credit Age",
    value: "4y 8m",
    status: "Very Good",
    description: "Average age of credit accounts",
  },
  {
    id: "cm",
    title: "Credit Mix",
    value: "Balanced",
    status: "Good",
    description: "Mix of cards and instalment loans",
  },
  {
    id: "re",
    title: "Recent Enquiries",
    value: "3",
    status: "Needs Attention",
    description: "Hard enquiries in the last 6 months",
  },
];

export type ImprovementItem = {
  id: string;
  title: string;
  description: string;
  healthPercent: number;
  status: ScoreFactor["status"];
};

export const mockImprovementPlan: ImprovementItem[] = [
  {
    id: "1",
    title: "Payment History",
    description: "Pay EMIs and credit card bills on time.",
    healthPercent: 95,
    status: "Excellent",
  },
  {
    id: "2",
    title: "Credit Utilization",
    description: "Keep utilization under control across cards.",
    healthPercent: 72,
    status: "Good",
  },
  {
    id: "3",
    title: "Recent Enquiries",
    description: "Avoid unnecessary credit applications.",
    healthPercent: 55,
    status: "Needs Attention",
  },
];

export const mockCreditReport = {
  personalInformation: mockCustomer,
  creditSummary: {
    score: mockCreditScore.score,
    category: mockCreditScore.category,
    totalAccounts: mockCreditAccounts.length,
    activeAccounts: mockCreditAccounts.filter((a) => a.accountStatus === "Active")
      .length,
    closedAccounts: mockCreditAccounts.filter((a) => a.accountStatus === "Closed")
      .length,
    totalEnquiries: mockCreditEnquiries.length,
    outstandingBalance: mockCreditAccounts.reduce(
      (sum, a) => sum + a.currentBalance,
      0,
    ),
  },
  accounts: mockCreditAccounts,
  enquiries: mockCreditEnquiries,
  factors: mockScoreFactors,
  publicInformation: [] as { type: string; detail: string; date: string }[],
  paymentHistorySummary: "No missed payments reported in the last 24 months (demo data).",
};
