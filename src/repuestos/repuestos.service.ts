import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../lib/prisma.js';

@Injectable()
export class RepuestosService {
  async findAll() {
    return prisma.repuestos.findMany({
      orderBy: {
        id: 'asc',
      },
    });
  }

async findOne(id: number) {
  const repuesto = await prisma.repuestos.findUnique({
    where: {
      id,
    },
  });

  if (!repuesto) {
    throw new NotFoundException(`Repuesto con ID ${id} no encontrado`);
  }

  return repuesto;
}

  async create(data: {
    nombre: string;
    precio: number;
    stock?: number;
  }) {
    return prisma.repuestos.create({
      data: {
        nombre: data.nombre,
        precio: data.precio,
        stock: data.stock ?? 0,
      },
    });
  }

 async update(
  id: number,
  data: {
    nombre?: string;
    precio?: number;
    stock?: number;
  },
) {
  const repuesto = await prisma.repuestos.findUnique({
    where: {
      id,
    },
  });

  if (!repuesto) {
    throw new NotFoundException(`Repuesto con ID ${id} no encontrado`);
  }

  return prisma.repuestos.update({
    where: {
      id,
    },
    data,
  });
}

  async remove(id: number) {
    const repuesto = await prisma.repuestos.findUnique({
      where: {
        id,
      },
    });

    if (!repuesto) {
      throw new NotFoundException(`Repuesto con ID ${id} no encontrado`);
    }

    return prisma.repuestos.delete({
      where: {
        id,
      },
    });
  }
}