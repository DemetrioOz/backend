import { Request, Response } from "express";
import {
  excludeEquipament,
  getEquipaments,
  postEquipament,
} from "../../services/equipaments";
import { updateEquipament } from "../../models/Equipament.model";

export const GET = async (req: Request, res: Response) => {
  try {
    const equipaments = await getEquipaments();
    res.status(200).json(equipaments);
    return;
  } catch (error) {
    res.status(400).json({ erro: "" });
    return;
  }
};

export const CREATE = async (req: Request, res: Response) => {
  try {
    const { tag, patrimonio, modelo } = req.body;
    const equipament = await postEquipament({ tag, patrimonio, modelo });
    res.status(200).json({ message: equipament });
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

export const EDIT = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { tag, patrimonio, modelo } = req.body;
    const equipament = await updateEquipament(id, { tag, patrimonio, modelo });
    res.status(200).json({ message: equipament });
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

export const DELETE = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await excludeEquipament(id);
    res.status(200).json({ message: "sucess" });
    return;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ erro: error.message });
    } else {
      res.status(400).json({ erro: "Ocorreu um erro desconhecido" });
    }
  }
};
