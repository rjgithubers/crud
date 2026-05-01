import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserRepository } from "@/repositories/user.repository";
import { sendVerificationEmail } from "@/services/email/email.service";

export async function SignupService(email: string, password: string) {
  const userRepo = new UserRepository();

  const existingUser = await userRepo.findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await userRepo.createUser({
    email,
    password: hashedPassword,
    isVerified: false,
  });

  const token = crypto.randomBytes(32).toString("hex");

  // Store verification token in database (you may need to add a field to your User model)
  await userRepo.updateUser(user.id, {
    // Add verificationToken field to your User model if needed
  });

  // Send verification email
  await sendVerificationEmail(email, token);

  return {
    message: "User created. Please check your email to verify your account.",
    user: {
      id: user.id,
      email: user.email,
      isVerified: user.isVerified,
    },
  };
};