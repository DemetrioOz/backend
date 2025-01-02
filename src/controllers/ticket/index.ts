import { Request, Response } from "express";
import {
  editTicket,
  excludeTicket,
  getTicket,
  getTickets,
  postTicket,
} from "../../services/tickets";
import { TicketType } from "../../types/ticketType";

export const GET = async (req: Request, res: Response) => {
  try {
    const tickets = await getTickets();
    res.status(200).json(tickets);
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
    const ticket = await getTicket(id);
    res.status(200).json({ message: ticket });
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
    const { numero, descricao, userId, status, equipamentId }: TicketType =
      req.body;
    const ticket = await postTicket({
      numero,
      descricao,
      userId,
      status,
      equipamentId,
    });
    res.status(200).json(ticket);
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

export const EDIT = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { descricao, status } = req.body;
    const ticket = await editTicket(id, descricao, status);
    res.status(200).json({ message: ticket });
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

export const DELETE = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await excludeTicket(id);
    res.status(200).json({ message: "sucess" });
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
