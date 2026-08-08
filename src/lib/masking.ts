export function maskMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, "").slice(-10);
  if (digits.length < 4) return "+91 ******";
  return `+91 ******${digits.slice(-4)}`;
}

export function maskPan(pan: string): string {
  const normalized = pan.toUpperCase().replace(/\s/g, "");
  if (normalized.length < 4) return "XXXXX****X";
  return `${normalized.slice(0, 2)}XXX${normalized.slice(-4, -1)}X`;
}

export function maskAccountNumber(accountNumber: string): string {
  const digits = accountNumber.replace(/\D/g, "");
  if (digits.length <= 4) return "XXXX";
  return `XXXX XXXX ${digits.slice(-4)}`;
}
