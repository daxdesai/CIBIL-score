import { z } from "zod";

const indianMobileRegex = /^[6-9]\d{9}$/;

export const loginSchema = z.object({
  mobile: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(10, "Enter a valid 10-digit mobile number")
    .regex(indianMobileRegex, "Enter a valid Indian mobile number"),
  customerId: z.string().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "Enter the 6-digit OTP")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export type OtpFormValues = z.infer<typeof otpSchema>;

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Enter your full name as per records"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  pan: z
    .string()
    .transform((v) => v.toUpperCase().replace(/\s/g, ""))
    .pipe(z.string().regex(panRegex, "Enter a valid PAN (e.g. ABCDE1234F)")),
  mobile: z
    .string()
    .regex(indianMobileRegex, "Enter a valid Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(10, "Enter your complete address"),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
});

export type PersonalDetailsFormValues = z.infer<typeof personalDetailsSchema>;

export const consentSchema = z.object({
  consent: z.boolean().refine((v) => v === true, {
    message: "You must provide consent to continue",
  }),
});

export type ConsentFormValues = z.infer<typeof consentSchema>;

export const profileEditSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  address: z.string().min(10, "Enter your complete address"),
  pinCode: z
    .string()
    .regex(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
});

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
