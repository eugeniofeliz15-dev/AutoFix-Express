import { Request, Response } from "express";
import {
  crearRepuesto,
  obtenerRepuestos,
  obtenerRepuestoPorId,
  actualizarRepuesto,
  eliminarRepuesto,
} from "../services/repuestoService.js";
import {
  repuestoSchema,
  actualizarRepuestoSchema,
} from "../utils/repuestoValidation.js";

export const crear = async (req: Request, res: Response) => {
  try {
    const resultado = repuestoSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: resultado.error.flatten().fieldErrors,
      });
    }

    const repuesto = await crearRepuesto(resultado.data);

    return res.status(201).json({
      message: "Repuesto creado correctamente",
      repuesto,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear el repuesto",
    });
  }
};

export const listar = async (req: Request, res: Response) => {
  try {
    const repuestos = await obtenerRepuestos();

    return res.status(200).json(repuestos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener los repuestos",
    });
  }
};

export const obtenerPorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const repuesto = await obtenerRepuestoPorId(id);

    if (!repuesto) {
      return res.status(404).json({
        message: "Repuesto no encontrado",
      });
    }

    return res.status(200).json(repuesto);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener el repuesto",
    });
  }
};
export const actualizar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const repuestoExistente = await obtenerRepuestoPorId(id);

    if (!repuestoExistente) {
      return res.status(404).json({
        message: "Repuesto no encontrado",
      });
    }

    const resultado = actualizarRepuestoSchema.safeParse(req.body);

    if (!resultado.success) {
      return res.status(400).json({
        message: "Datos inválidos",
        errors: resultado.error.flatten().fieldErrors,
      });
    }

    const repuesto = await actualizarRepuesto(id, resultado.data);

    return res.status(200).json({
      message: "Repuesto actualizado correctamente",
      repuesto,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al actualizar el repuesto",
    });
  }
};

export const eliminar = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const repuestoExistente = await obtenerRepuestoPorId(id);

    if (!repuestoExistente) {
      return res.status(404).json({
        message: "Repuesto no encontrado",
      });
    }

    await eliminarRepuesto(id);

    return res.status(200).json({
      message: "Repuesto eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al eliminar el repuesto",
    });
  }
};