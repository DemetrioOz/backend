import { Request, Response } from "express";
import {
  editUser,
  excludeUser,
  getUser,
  getUsers,
  postUser,
} from "../../services/user";

export const GET = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
    return;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(400).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: "Erro desconhecido" });
    }
    return;
  }
};

export const UNIQUE = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const user = await getUser(id);
    res.status(200).json({ message: user });
    return;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: "Ocorreu um erro desconhecido" });
    }
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
      console.log(error);
      res.status(400).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: "Erro desconhecido" });
    }
    return;
  }
};

export const EDIT = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { nome, email, password, permissao } = req.body;
    const user = await editUser({ id, nome, email, password, permissao });
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: "Erro desconhecido" });
    }
    return;
  }
};

export const DELETE = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await excludeUser(id);
    res.status(200).json({ message: "sucess" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: "Erro desconhecido" });
    }
  }
};
