import bcrypt from "bcrypt";
import { UserRepository } from "@/repositories/user.repository";

export async function LoginService(email: string, password: string) {
  const userRepo = new UserRepository();
  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  if (!user.isVerified) {
    throw new Error("Please verify your email first");
  }

  return {
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
    },
  };
};