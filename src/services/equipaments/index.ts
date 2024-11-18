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

export const getEquipaments = async (): Promise<Equipament[]> => {
  const equipaments = await getAllEquipaments();
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
  await getEquipamentById(id);
  return await deleteEquipament(id);
};
