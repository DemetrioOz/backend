import { getUserByData } from "../../models/User.model";
import jwt from "jsonwebtoken";
import { regex } from "../../regex";

type authType = {
  email: string;
  password: string;
};

export const authenticate = async ({ email, password }: authType) => {
  if (regex("void", email) || regex("void", password))
    throw new Error("Por favor preencha corretamente");
  const emailGet = await getUserByData({ field: "email", value: email });
  if (!emailGet) throw new Error("Usuario não encontrado.");
  if (emailGet.password !== password) throw new Error("Senha inválida");
  const token = jwt.sign(String(email + password), "secret");
  return token;
};
