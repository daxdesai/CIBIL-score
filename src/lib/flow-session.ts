const FLOW_MOBILE_KEY = "flow_pending_mobile";
const FLOW_CUSTOMER_ID_KEY = "flow_pending_customer_id";

export function setFlowCredentials(mobile: string, customerId?: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(FLOW_MOBILE_KEY, mobile);
  if (customerId) sessionStorage.setItem(FLOW_CUSTOMER_ID_KEY, customerId);
  else sessionStorage.removeItem(FLOW_CUSTOMER_ID_KEY);
}

export function getFlowMobile(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(FLOW_MOBILE_KEY);
}

export function getFlowCustomerId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(FLOW_CUSTOMER_ID_KEY);
}

export function clearFlowCredentials() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(FLOW_MOBILE_KEY);
  sessionStorage.removeItem(FLOW_CUSTOMER_ID_KEY);
}
