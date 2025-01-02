import { Tickets } from "@prisma/client";
import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketByData,
  updateTicket,
} from "../../models/Ticket.model";
import { TicketType } from "../../types/ticketType";
import { regex } from "../../regex";
import { redis } from "../../database/redis";

export const getTickets = async (): Promise<Tickets[]> => {
  const cacheData = await redis.get("tickets");
  if (cacheData) {
    await redis.del("tickets");
    return JSON.parse(cacheData);
  }
  const tickets = await getAllTickets();
  await redis.set("tickets", JSON.stringify(tickets), "EX", 80000);
  return tickets;
};

export const getTicket = async (id: string) => {
  const cacheData = await redis.get(`ticket${id}`);
  if (cacheData) return JSON.parse(cacheData);
  const ticket = await getTicketByData({ field: "id", value: id });
  await redis.set(`ticket${id}`, JSON.stringify(ticket), "EX", 800000);
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
    regex("void", userId) ||
    regex("void", status) ||
    regex("void", equipamentId)
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

export const editTicket = async (
  id: string,
  descricao: string,
  status: string
) => {
  const idGet = await getTicketByData({ field: "id", value: id });
  if (!idGet) throw new Error("Usuario não encontrado.");
  const numberGet = await getTicketByData({ field: "id", value: id });
  if (!idGet) throw new Error("Usuario não encontrado.");
  if (regex("void", descricao) || regex("void", status)) {
    throw new Error("Por favor preencha corretamente");
  }
  return updateTicket(id, descricao, status);
};

export const excludeTicket = async (id: string) => {
  const idGet = await getTicketByData({ field: "id", value: id });
  if (!idGet) throw new Error("Usuario não encontrado.");
  return await deleteTicket(id);
};
