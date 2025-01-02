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

export const getTicketByData = async ({
  field,
  value,
}: {
  field: "id" | "numero";
  value: string;
}): Promise<Tickets> => {
  const ticket = await prisma.tickets.findFirst({
    where: {
      [field]: value,
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

export const updateTicket = async (
  id: string,
  descricao: string,
  status: string
) => {
  const updateTicket = await prisma.tickets.update({
    where: {
      id,
    },
    data: {
      descricao,
      status,
    },
  });
  return updateTicket;
};

export const deleteTicket = async (id: string) => {
  const deleteTicket = await prisma.tickets.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
  return deleteTicket;
};
