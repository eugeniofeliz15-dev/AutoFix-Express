import { prisma } from "../config/prisma.js";

export const findAllDetallesRepuestos = async () => {
  return await prisma.detalleRepuestoOrden.findMany({
    include: {
      orden: true,
      repuesto: true,
    },
    orderBy: {
      creadoEn: "desc",
    },
  });
};

export const findDetalleRepuestoById = async (id: number) => {
  return await prisma.detalleRepuestoOrden.findUnique({
    where: { id },
    include: {
      orden: true,
      repuesto: true,
    },
  });
};

export const createDetalleRepuesto = async (data: {
  ordenId: number;
  repuestoId: number;
  cantidad: number;
  precioUnitario: number;
}) => {
  return await prisma.detalleRepuestoOrden.create({
    data,
    include: {
      orden: true,
      repuesto: true,
    },
  });
};

export const updateDetalleRepuesto = async (
  id: number,
  data: {
    cantidad?: number;
    precioUnitario?: number;
  },
) => {
  return await prisma.detalleRepuestoOrden.update({
    where: { id },
    data,
    include: {
      orden: true,
      repuesto: true,
    },
  });
};

export const deleteDetalleRepuesto = async (id: number) => {
  return await prisma.detalleRepuestoOrden.delete({
    where: { id },
  });
};