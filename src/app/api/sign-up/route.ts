import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnenct from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnenct();

  try {
    const { username, email, password } = await request.json();

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    const verifyCode = Math.random().toString(36).substring(2, 9);

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "Email already exists",
          },
          {
            status: 400,
          }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        existingUserByEmail.password = hashedPassword; // Update password
        existingUserByEmail.verifyCode = verifyCode; // Update verification code
        existingUserByEmail.verifyCodeExpiry = new Date(
          Date.now() + 60 * 60 * 1000 // 1 hour from now
        ); // Update expiry date

        await existingUserByEmail.save(); // Save the updated user
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 1); // Set expiry date

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        isVerified: false,
        verifyCode,
        verifyCodeExpiry: expiryDate.setHours(expiryDate.getHours() + 1),
        isAcceptingMessages: true,
        messages: [],
      });

      await newUser.save(); // Save the new user to the database
    }
    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        {
          status: 500,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your account.",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error registering new user", error);
    return Response.json(
      {
        success: false,
        message: "Error registering new user",
      },
      {
        status: 500,
      }
    );
  }
}
