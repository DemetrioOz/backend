import { Equipament } from "@prisma/client";
import {
  createEquipament,
  deleteEquipament,
  getAllEquipaments,
  getEquipamentById,
  updateEquipament,
} from "../../models/Equipament.model";
import { EquipamentType } from "../../types/equipamentType";
import { regex } from "../../regex";
import { redis } from "../../database/redis";

export const getEquipaments = async (): Promise<Equipament[]> => {
  const cacheData = await redis.get("users");
  if (cacheData) return JSON.parse(cacheData);
  const equipaments = await getAllEquipaments();
  await redis.set("equipaments", JSON.stringify(equipaments), "EX", 80000);
  return equipaments as Equipament[];
};

export const getEquipament = async (id: string) => {
  const equipaments = await getAllEquipaments();
  return equipaments as Equipament[];
};

export const postEquipament = async ({
  tag,
  patrimonio,
  modelo,
}: EquipamentType): Promise<Equipament> => {
  if (
    regex("void", tag) ||
    regex("void", patrimonio) ||
    regex("void", modelo)
  ) {
    throw new Error("Por favor preencha corretamente");
  }
  return await createEquipament({ tag, patrimonio, modelo });
};

export const editEquipament = async (
  id: string,
  { tag, patrimonio, modelo }: EquipamentType
) => {
  await getEquipamentById(id);
  if (
    regex("void", tag) ||
    regex("void", patrimonio) ||
    regex("void", modelo)
  ) {
    throw new Error("Por favor preencha corretamente");
  }
  return await updateEquipament(id, { tag, patrimonio, modelo });
};

export const excludeEquipament = async (id: string): Promise<Equipament> => {
  const idGet = await getEquipamentById(id);
  if (!idGet) throw new Error("Usuario não encontrado.");
  return await deleteEquipament(id);
};
