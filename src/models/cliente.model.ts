import { prisma } from "../config/prisma.js";

export const findAllClientes = async () => {
  return await prisma.cliente.findMany({
    include: { vehiculos: true },
    orderBy: { creadoAt: "desc" },
  });
};

export const findClienteById = async (id: number) => {
  return await prisma.cliente.findUnique({
    where: { id },
    include: {
      vehiculos: {
        include: {
          ordenes: true,
        },
      },
    },
  });
};

export const findClienteByEmail = async (email: string) => {
  return await prisma.cliente.findUnique({
    where: { email },
  });
};

export const createCliente = async (data: {
  nombre: string;
  telefono?: string;
  email?: string;
}) => {
  return await prisma.cliente.create({
    data,
  });
};

export const updateCliente = async (
  id: number,
  data: { nombre?: string; telefono?: string; email?: string },
) => {
  return await prisma.cliente.update({
    where: { id },
    data,
  });
};

export const deleteCliente = async (id: number) => {
  return await prisma.cliente.delete({
    where: { id },
  });
};
