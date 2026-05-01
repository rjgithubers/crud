// repositories/user.repository.ts
import { prisma } from "@/lib/prisma";

export const createUser = (data: { email: string; password: string }) => {
  return prisma.user.create({ data });
};

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getAllUsers = () => {
  return prisma.user.findMany();
};

export const updateUser = (id: string, data: any) => {
  return prisma.user.update({
    where: { id },
    data
  });
};

export const deleteUser = (id: string) => {
  return prisma.user.delete({
    where: { id }
  });
};