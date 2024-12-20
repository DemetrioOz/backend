import { Request, Response } from "express";
import { getTickets, postTicket } from "../../services/tickets";
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
