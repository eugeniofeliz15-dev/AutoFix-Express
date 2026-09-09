import { Request, Response } from "express";
import {
  findAllVehiculos,
  findVehiculoById,
  findVehiculoByPlaca,
  createVehiculo,
  updateVehiculo,
  deleteVehiculo,
} from "../models/vehiculo.model.js";
import { findClienteById } from "../models/cliente.model.js";

/**
 * @swagger
 * tags:
 *   name: Vehiculos
 *   description: Gestión de vehículos del taller
 */

export const getVehiculos = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/vehiculos:
   *   get:
   *     summary: Listar todos los vehículos registrados
   *     tags: [Vehiculos]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de vehículos
   *       401:
   *         description: No autenticado
   */
  try {
    const vehiculos = await findAllVehiculos();
    res.status(200).json(vehiculos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehiculo = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/vehiculos/{id}:
   *   get:
   *     summary: Obtener vehículo por ID
   *     tags: [Vehiculos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Datos del vehículo
   *       404:
   *         description: Vehículo no encontrado
   */
  try {
    const id = Number(req.params.id);
    const vehiculo = await findVehiculoById(id);

    if (!vehiculo) {
      res.status(404).json({ message: "Vehículo no encontrado" });
      return;
    }

    res.status(200).json(vehiculo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehiculoPorPlaca = async (
  req: Request<{ placa: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/vehiculos/placa/{placa}:
   *   get:
   *     summary: Buscar un vehículo por su número de placa
   *     tags: [Vehiculos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: placa
   *         required: true
   *         schema:
   *           type: string
   *         example: '4589-KLP'
   *     responses:
   *       200:
   *         description: Vehículo encontrado
   *       404:
   *         description: Vehículo no registrado
   */
  try {
    const placa = req.params.placa;
    const vehiculo = await findVehiculoByPlaca(placa);

    if (!vehiculo) {
      res.status(404).json({ message: "Vehículo no encontrado con esa placa" });
      return;
    }

    res.status(200).json(vehiculo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const postVehiculo = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/vehiculos:
   *   post:
   *     summary: Registrar un vehículo para un cliente existente
   *     tags: [Vehiculos]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VehiculoDTO'
   *     responses:
   *       201:
   *         description: Vehículo creado exitosamente
   *       400:
   *         description: Campos obligatorios incompletos
   *       404:
   *         description: Cliente no existe
   *       409:
   *         description: La placa ya se encuentra registrada
   */
  try {
    const { placa, marca, modelo, clienteId } = req.body;

    if (!placa || !marca || !modelo || !clienteId) {
      res.status(400).json({
        message:
          "Todos los campos son obligatorios (placa, marca, modelo, clienteId)",
      });
      return;
    }

    const placaExistente = await findVehiculoByPlaca(placa);
    if (placaExistente) {
      res
        .status(409)
        .json({ message: "Ya existe un vehículo registrado con esta placa" });
      return;
    }

    const cliente = await findClienteById(Number(clienteId));
    if (!cliente) {
      res.status(404).json({ message: "El cliente asignado no existe" });
      return;
    }

    const nuevoVehiculo = await createVehiculo({
      placa: placa.toUpperCase().trim(),
      marca,
      modelo,
      clienteId: Number(clienteId),
    });

    res.status(201).json(nuevoVehiculo);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const putVehiculo = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/vehiculos/{id}:
   *   put:
   *     summary: Actualizar datos de un vehículo
   *     tags: [Vehiculos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/VehiculoDTO'
   *     responses:
   *       200:
   *         description: Vehículo actualizado
   *       400:
   *         description: Error en la actualización
   */
  try {
    const id = Number(req.params.id);
    const { placa, marca, modelo, clienteId } = req.body;

    const vehiculoActualizado = await updateVehiculo(id, {
      placa: placa ? placa.toUpperCase().trim() : undefined,
      marca,
      modelo,
      clienteId: clienteId ? Number(clienteId) : undefined,
    });

    res.status(200).json(vehiculoActualizado);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeVehiculo = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/vehiculos/{id}:
   *   delete:
   *     summary: Eliminar un vehículo (Solo Dueño)
   *     tags: [Vehiculos]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Vehículo eliminado
   *       400:
   *         description: No se puede eliminar si posee órdenes de trabajo
   *       403:
   *         description: Requiere rol DUENO
   */
  try {
    const id = Number(req.params.id);
    await deleteVehiculo(id);
    res.status(200).json({ message: "Vehículo eliminado correctamente" });
  } catch (error: any) {
    res.status(400).json({
      message:
        "No se puede eliminar el vehículo porque tiene órdenes de trabajo asociadas",
    });
  }
};
