import { Tickets } from "@prisma/client";
import {
  createTicket,
  getAllTickets,
  getTicketById,
} from "../../models/Ticket.model";
import { TicketType } from "../../types/ticketType";
import { regex } from "../../regex";

export const getTickets = async (): Promise<Tickets[]> => {
  const tickets = await getAllTickets();
  return tickets;
};

export const getTicket = async (id: string): Promise<Tickets> => {
  const ticket = await getTicketById(id);
  return ticket;
};

export const postTicket = async ({
  numero,
  descricao,
  userId,
  status,
  equipamentId,
}: TicketType) => {
  if (
    regex("void", numero) ||
    regex("void", descricao) ||
    regex("void", status)
  )
    throw new Error("Por favor preencha corretamente");
  if (regex("tag", numero))
    throw new Error("Por favor verifique se a tag esta correta");
  const ticket = await createTicket({
    numero,
    descricao,
    userId,
    status,
    equipamentId,
  });
  return ticket;
};
