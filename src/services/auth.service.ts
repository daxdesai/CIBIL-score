const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export type LoginPayload = {
  mobile: string;
  customerId?: string;
};

export type OtpVerifyPayload = {
  mobile: string;
  otp: string;
};

export type AuthSession = {
  mobile: string;
  customerId?: string;
  verifiedAt: string;
};

/** Demo OTP verification — accepts any valid 6-digit code. No secrets in UI. */
export async function requestOtp(payload: LoginPayload): Promise<{ success: boolean }> {
  await delay(800);
  if (!payload.mobile) {
    throw new Error("Mobile number is required.");
  }
  return { success: true };
}

export async function verifyOtp(
  payload: OtpVerifyPayload,
): Promise<{ session: AuthSession }> {
  await delay(1000);
  if (!/^\d{6}$/.test(payload.otp)) {
    throw new Error("Invalid OTP. Please try again.");
  }
  return {
    session: {
      mobile: payload.mobile,
      verifiedAt: new Date().toISOString(),
    },
  };
}

export async function resendOtp(mobile: string): Promise<{ success: boolean }> {
  await delay(600);
  if (!mobile) throw new Error("Mobile number is required.");
  return { success: true };
}
