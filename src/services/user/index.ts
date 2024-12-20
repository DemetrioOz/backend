import { User } from "@prisma/client";
import { UserType } from "../../types/userType";
import { regex } from "../../regex";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserByData,
  updateUser,
} from "../../models/User.model";
import { redis } from "../../database/redis";

export const getUsers = async () => {
  const cacheData = await redis.get("users");
  if (cacheData) return JSON.parse(cacheData);
  const users = await getAllUsers();
  await redis.set("users", JSON.stringify(users), "EX", 80000);
  return users;
};

export const postUser = async ({
  nome,
  email,
  password,
  permissao,
}: UserType): Promise<User> => {
  if (regex("void", nome) || regex("void", email) || regex("void", password))
    throw new Error("Por favor preencha corretamente");
  if (!regex("email", email)) throw new Error("Verique o endereço de email");
  const emailGet = await getUserByData({ field: "email", value: email });
  if (emailGet) throw new Error("Usuario já cadastradodo.");
  const user = await createUser({ nome, email, password, permissao });
  return user;
};

export const editUser = async ({
  id,
  nome,
  email,
  password,
  permissao,
}: UserType) => {
  if (
    regex("void", id || "") ||
    regex("void", nome) ||
    regex("void", email) ||
    regex("void", password) ||
    regex("void", permissao)
  )
    throw new Error("Por favor preencha corretamente");
  const idGet = await getUserByData({ field: "id", value: id || "" });
  if (!idGet) throw new Error("Usuario não encontrado.");
  const emailGet = await getUserByData({ field: "email", value: email });
  if (!emailGet) throw new Error("Não é possível trocar o email.");
  const user = await updateUser({ nome, email, password, permissao });
  return user;
};

export const excludeUser = async (id: string) => {
  const idGet = await getUserByData({ field: "id", value: id || "" });
  if (!idGet) throw new Error("Usuario não encontrado.");
  await deleteUser(id);
};
