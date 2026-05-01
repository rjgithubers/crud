// repositories/user.repository.ts
import { prisma } from "@/lib/prisma";

export interface UserData {
  email: string;
  password: string;
  isVerified: boolean;
};

console.log("PRISMA:", prisma);
console.log("USER MODEL:", prisma?.user);

export class UserRepository {
  

  async createUser(data: UserData)  {
    return prisma.user.create({ data });
  }

  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async findUserById(id: string) {
    return  prisma.user.findUnique({
      where: { id }
    });
  }

  async getAllUsers() {
    return prisma.user.findMany();
  }

  async updateUser(
    id: string,
    data: Partial<UserData >  
  ){
    return prisma.user.update({
      where: { id },
      data
    });
  }

  async deleteUser(id: string) {
    return prisma.user.delete({
      where: { id }
    });
  }

}