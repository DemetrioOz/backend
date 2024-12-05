import prisma from "../database/prisma";
import { User, Prisma } from "@prisma/client";
import { UserType } from "../types/userType";

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany();
  return users;
};

export const getUserByData = async ({
  field,
  value,
}: {
  field: "id" | "nome" | "email" | "password" | "permissao";
  value: string;
}) => {
  const user = await prisma.user.findFirst({
    where: {
      [field]: value,
    },
  });
  return user;
};

export const createUser = async ({
  nome,
  email,
  password,
  permissao,
}: UserType): Promise<User> => {
  const user = await prisma.user.create({
    data: {
      nome,
      email,
      password,
      permissao,
    },
  });
  return user;
};

export const updateUser = async (body: string) => {};

export const deleteUser = async (id: string) => {};
