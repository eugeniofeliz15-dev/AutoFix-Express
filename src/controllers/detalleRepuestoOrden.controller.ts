import { Request, Response } from "express";

import {
  findAllDetallesRepuestos,
  findDetalleRepuestoById,
  createDetalleRepuesto,
  updateDetalleRepuesto,
  deleteDetalleRepuesto,
} from "../models/detalleRepuestoOrden.model.js";

export const getDetallesRepuestos = async (
  req: Request,
  res: Response,
) => {
  try {
    const detalles = await findAllDetallesRepuestos();

    res.status(200).json(detalles);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener los detalles de repuestos",
    });
  }
};

export const getDetalleRepuesto = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const detalle = await findDetalleRepuestoById(id);

    if (!detalle) {
      return res.status(404).json({
        message: "Detalle de repuesto no encontrado",
      });
    }

    res.status(200).json(detalle);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al obtener el detalle de repuesto",
    });
  }
};

export const postDetalleRepuesto = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      ordenId,
      repuestoId,
      cantidad,
      precioUnitario,
    } = req.body;

    if (
      ordenId === undefined ||
      repuestoId === undefined ||
      cantidad === undefined ||
      precioUnitario === undefined
    ) {
      return res.status(400).json({
        message: "Todos los campos son obligatorios",
      });
    }

    if (
      !Number.isInteger(Number(ordenId)) ||
      !Number.isInteger(Number(repuestoId))
    ) {
      return res.status(400).json({
        message: "ordenId y repuestoId deben ser números enteros",
      });
    }

    if (!Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0) {
      return res.status(400).json({
        message: "La cantidad debe ser un número entero mayor que 0",
      });
    }

    if (Number(precioUnitario) < 0) {
      return res.status(400).json({
        message: "El precio unitario no puede ser negativo",
      });
    }

    const detalle = await createDetalleRepuesto({
      ordenId: Number(ordenId),
      repuestoId: Number(repuestoId),
      cantidad: Number(cantidad),
      precioUnitario: Number(precioUnitario),
    });

    res.status(201).json(detalle);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error al crear el detalle de repuesto",
    });
  }
};

export const putDetalleRepuesto = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    const { cantidad, precioUnitario } = req.body;

    if (cantidad === undefined && precioUnitario === undefined) {
      return res.status(400).json({
        message: "Debe enviar al menos un campo para actualizar",
      });
    }

    if (
      cantidad !== undefined &&
      (!Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0)
    ) {
      return res.status(400).json({
        message: "La cantidad debe ser un número entero mayor que 0",
      });
    }

    if (
      precioUnitario !== undefined &&
      Number(precioUnitario) < 0
    ) {
      return res.status(400).json({
        message: "El precio unitario no puede ser negativo",
      });
    }

    const detalle = await updateDetalleRepuesto(id, {
      ...(cantidad !== undefined && {
        cantidad: Number(cantidad),
      }),
      ...(precioUnitario !== undefined && {
        precioUnitario: Number(precioUnitario),
      }),
    });

    res.status(200).json(detalle);
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Error al actualizar el detalle de repuesto",
    });
  }
};

export const removeDetalleRepuesto = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "ID inválido",
      });
    }

    await deleteDetalleRepuesto(id);

    res.status(200).json({
      message: "Detalle de repuesto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      message: "Error al eliminar el detalle de repuesto",
    });
  }
};