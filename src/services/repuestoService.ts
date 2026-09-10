import { prisma } from "../lib/prisma.js";

export const crearRepuesto = async (data: {
  nombre: string;
  precio: number;
  stock?: number;
}) => {
  return await prisma.repuestos.create({
    data: {
      nombre: data.nombre,
      precio: data.precio,
      stock: data.stock ?? 0,
    },
  });
};

export const obtenerRepuestos = async () => {
  return await prisma.repuestos.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

export const obtenerRepuestoPorId = async (id: number) => {
  return await prisma.repuestos.findUnique({
    where: { id },
  });
};

export const actualizarRepuesto = async (
  id: number,
  data: {
    nombre?: string;
    precio?: number;
    stock?: number;
  }
) => {
  return await prisma.repuestos.update({
    where: { id },
    data,
  });
};

export const eliminarRepuesto = async (id: number) => {
  return await prisma.repuestos.delete({
    where: { id },
  });
};