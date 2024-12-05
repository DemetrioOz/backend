import { TicketType } from "./ticketType";

export type UserType = {
  id?: string;
  nome: string;
  email: string;
  password: string;
  permissao: string;
  Tickets?: TicketType[];
  Features?: string[];
};
