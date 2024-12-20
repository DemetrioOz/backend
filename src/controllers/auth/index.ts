import { Request, Response } from "express";
import { authenticate } from "../../services/auth";

export const LOGIN = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await authenticate({ email, password });
  res.status(200).json({ auth: true, token: token });
  return;
};

export const LOGOUT = async (req: Request, res: Response) => {
  res.json({ auth: false, token: null });
};
