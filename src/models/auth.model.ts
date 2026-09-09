import { prisma } from "../config/prisma.js";
import { Role } from "../generated/prisma/client.js";

export const findUsuarioByEmail = async (email: string) => {
  return await prisma.usario.findUnique({
    where: { email },
  });
};

export const createUsuario = async (
  nombre: string,
  email: string,
  passwordHash: string,
  rol: Role,
) => {
  return await prisma.usario.create({
    data: {
      nombre,
      email,
      password: passwordHash,
      rol,
    },
    select: {
      id: true,
      nombre: true,
      email: true,
      rol: true,
      creadoEn: true,
    },
  });
};

export const findMecanicosDisponibles = async () => {
  return await prisma.usario.findMany({
    where: { rol: Role.MECANICO },
    select: {
      id: true,
      nombre: true,
      email: true,
    },
  });
};
