import dbConnenct from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});
export default async function POST(request: Request) {
  await dbConnenct();
  try {
    const { username, code } = await request.json();

    const result = UsernameQuerySchema.safeParse({ username });

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(", ")
              : "Invalid username format",
        },
        { status: 400 }
      );
    }

    const User = await UserModel.findOne({ username });

    if (!User) {
      return Response.json(
        {
          success: false,
          message: "Username does not exist",
        },
        { status: 500 }
      );
    }

    const isCodeValid = User.verifyCode === code; // Check if the provided code matches the user's verify code
    const isNotExpired = new Date(User.verifyCodeExpiry) > new Date(); // Check if the code has not expired

    if (isCodeValid && isNotExpired) {
      User.isVerified = true;
      await User.save(); // Save the user with updated verification status
      return Response.json(
        {
          success: true,
          message: "Account has been verified successfully",
        },
        { status: 200 }
      );
    } else if (!isNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verification code has expired, please Signup again to get a new code",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error in verify email code API: ", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying email code",
      },
      { status: 500 }
    );
  }
}
