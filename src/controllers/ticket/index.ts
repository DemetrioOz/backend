import { Request, Response } from "express";
import { getTickets, postTicket } from "../../services/tickets";

export const GET = async (req: Request, res: Response) => {
  try {
    const tickets = await getTickets();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json(error);
  }
};

export const CREATE = async (req: Request, res: Response) => {
  try {
    const {
      numero,
      descricao,
      userId = null,
      status,
      equipamentId = null,
    } = req.body;
    const ticket = await postTicket({
      numero,
      descricao,
      userId,
      status,
      equipamentId,
    });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json(error);
  }
};
