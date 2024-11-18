import prisma from "../database/prisma";
import { Equipament } from "@prisma/client";
import { EquipamentType } from "../types/equipamentType";

export const getAllEquipaments = async () => {
  try {
    const equipaments: Equipament[] = await prisma.equipament.findMany({
      where: {
        deleted_at: null,
      },
    });
    return equipaments;
  } catch (error) {
    return error;
  }
};

export const getEquipamentById = async (id: string): Promise<Equipament> => {
  const equipament = await prisma.equipament.findUnique({
    where: {
      id,
    },
  });
  if (!equipament) {
    throw new Error("Equipamento não encontrado");
  }
  return equipament;
};

export const createEquipament = async ({
  tag,
  patrimonio,
  modelo,
}: EquipamentType): Promise<Equipament> => {
  const equipament: Equipament = await prisma.equipament.create({
    data: {
      tag,
      patrimonio,
      modelo,
    },
  });
  return equipament;
};

export const updateEquipament = async (
  id: string,
  { tag, patrimonio, modelo }: EquipamentType
): Promise<Equipament> => {
  const updateUser = await prisma.equipament.update({
    where: {
      id,
    },
    data: {
      tag,
      patrimonio,
      modelo,
    },
  });
  return updateUser;
};

export const deleteEquipament = async (id: string): Promise<Equipament> => {
  const deleteEquipament = await prisma.equipament.update({
    where: {
      id,
    },
    data: {
      deleted_at: new Date(),
    },
  });
  return deleteEquipament;
};
