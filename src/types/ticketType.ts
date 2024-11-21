export type TicketType = {
  numero: string;
  descricao: string;
  userId?: string | null;
  status: string;
  equipamentId?: string | null;
};
