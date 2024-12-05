import { User } from "@prisma/client";
import { UserType } from "../../types/userType";
import { regex } from "../../regex";
import {
  createUser,
  getAllUsers,
  getUserByData,
} from "../../models/User.model";

export const getUsers = async () => {
  const users = await getAllUsers();
  return users;
};

export const postUser = async ({
  nome,
  email,
  password,
  permissao,
}: UserType) => {
  // if (regex("void", nome) || regex("void", email) || regex("void", password))
  //   throw new Error("Por favor preencha corretamente");
  // if (regex("email", email))
  //   throw new Error("Por favor verifique se a tag esta correta");
  console.log(nome, email, password, permissao);
  // const user = await createUser({ nome, email, password, permissao });
  // console.log(user);
  return { nome, email, password, permissao };
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
  const emailGet = await getUserByData({ field: "email", value: email });
  if (!emailGet) throw new Error("Usuario não encontrado.");

  console.log(emailGet);
};
