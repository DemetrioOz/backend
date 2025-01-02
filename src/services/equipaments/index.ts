import { Equipament } from "@prisma/client";
import {
  createEquipament,
  deleteEquipament,
  getAllEquipaments,
  getEquipamentByData,
  updateEquipament,
} from "../../models/Equipament.model";
import { EquipamentType } from "../../types/equipamentType";
import { regex } from "../../regex";
import { redis } from "../../database/redis";

export const getEquipaments = async (): Promise<Equipament[]> => {
  const cacheData = await redis.get("equipaments");
  if (cacheData) {
    await redis.del("equipaments");
    return JSON.parse(cacheData);
  }
  const equipaments = await getAllEquipaments();
  await redis.set("equipaments", JSON.stringify(equipaments), "EX", 80000);
  return equipaments as Equipament[];
};

export const getEquipament = async (id: string) => {
  const cacheData = await redis.get(`equipament${id}`);
  if (cacheData) return JSON.parse(cacheData);
  const equipament = await getEquipamentByData({ field: "id", value: id });
  await redis.set(`equipament${id}`, JSON.stringify(equipament), "EX", 800000);
  return equipament;
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
  await getEquipamentByData({ field: "id", value: id });
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
  const idGet = await getEquipamentByData({ field: "id", value: id });
  if (!idGet) throw new Error("Usuario não encontrado.");
  return await deleteEquipament(id);
};
