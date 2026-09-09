import { prisma } from "../config/prisma.js";

export const findAllVehiculos = async () => {
  return await prisma.vehiculo.findMany({
    include: {
      cliente: true,
    },
    orderBy: { creadoAt: "desc" },
  });
};

export const findVehiculoById = async (id: number) => {
  return await prisma.vehiculo.findUnique({
    where: { id },
    include: {
      cliente: true,
      ordenes: {
        orderBy: { creadoEn: "desc" },
      },
    },
  });
};

export const findVehiculoByPlaca = async (placa: string) => {
  return await prisma.vehiculo.findUnique({
    where: { placa },
    include: {
      cliente: true,
      ordenes: true,
    },
  });
};

export const createVehiculo = async (data: {
  placa: string;
  marca: string;
  modelo: string;
  clienteId: number;
}) => {
  return await prisma.vehiculo.create({
    data,
    include: {
      cliente: true,
    },
  });
};

export const updateVehiculo = async (
  id: number,
  data: { placa?: string; marca?: string; modelo?: string; clienteId?: number },
) => {
  return await prisma.vehiculo.update({
    where: { id },
    data,
    include: {
      cliente: true,
    },
  });
};

export const deleteVehiculo = async (id: number) => {
  return await prisma.vehiculo.delete({
    where: { id },
  });
};
