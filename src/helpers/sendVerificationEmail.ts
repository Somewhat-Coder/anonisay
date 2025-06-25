import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

/**
 * Verifies the user's email address by sending a verification code.
 * @param email // The email address to send the verification code to
 * @param username // The username of the user
 * @param verifyCode  // The verification code to be sent
 * @returns A promise that resolves to an ApiResponse object
 */

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Anonisay account verification",
      react: VerificationEmail({
        username,
        otp: verifyCode,
      }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
}
