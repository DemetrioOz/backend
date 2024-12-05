import { Request, Response } from "express";
import { editUser, getUsers, postUser } from "../../services/user";

export const GET = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
    return;
  } catch (error) {
    res.status(400).json(error);
    return;
  }
};

export const CREATE = async (req: Request, res: Response) => {
  try {
    const { nome, email, password, permissao = "user" } = req.body;
    const user = await postUser({ nome, email, password, permissao });
    res.status(200).json(user);
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    } else {
      res.status(400).json("Erro desconhecido");
    }
    return;
  }
};

export const EDIT = async (req: Request, res: Response) => {
  const { id, nome, email, password, permissao } = req.body();
  await editUser({ id, nome, email, password, permissao });
  try {
  } catch (error) {
    res.status(200).json(error);
  }
};
