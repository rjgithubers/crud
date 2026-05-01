import { UserRepository } from "@/repositories/user.repository";

const userRepo = new UserRepository();

export async function VerifyEmailService(email: string) {
  const user = await userRepo.findUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  if (user.isVerified) {
    return { message: "Email already verified" };
  }

  const updatedUser = await userRepo.updateUser(user.id, {
    isVerified: true,
  });

  return {
    message: "Email verified successfully",
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      isVerified: updatedUser.isVerified,
    },
  };
}