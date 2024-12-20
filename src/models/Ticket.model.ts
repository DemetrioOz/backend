import prisma from "../database/prisma";
import { Tickets } from "@prisma/client";
import { TicketType } from "../types/ticketType";

export const getAllTickets = async (): Promise<Tickets[]> => {
  const tickets = await prisma.tickets.findMany({
    where: {
      deleted_at: null,
    },
  });
  return tickets;
};

export const getTicketById = async (id: string): Promise<Tickets> => {
  const ticket = await prisma.tickets.findUnique({
    where: {
      id,
    },
  });
  if (!ticket) {
    throw new Error("Equipamento não encontrado");
  }
  return ticket;
};

export const createTicket = async ({
  numero,
  descricao,
  userId,
  status,
  equipamentId,
}: TicketType) => {
  const ticket: Tickets = await prisma.tickets.create({
    data: {
      numero,
      descricao,
      userId,
      status,
      equipamentId,
    },
  });
  return ticket;
};

export const updateTicket = async (body: string) => {};

export const deleteTicket = async (id: string) => {};
