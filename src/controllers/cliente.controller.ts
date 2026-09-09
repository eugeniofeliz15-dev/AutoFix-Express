import { Request, Response } from "express";
import {
  findAllClientes,
  findClienteById,
  findClienteByEmail,
  createCliente,
  updateCliente,
  deleteCliente,
} from "../models/cliente.model.js";

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gestión de clientes del taller
 */

export const getClientes = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/clientes:
   *   get:
   *     summary: Obtener todos los clientes registrados
   *     tags: [Clientes]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de clientes obtenida
   *       401:
   *         description: No autenticado
   */
  try {
    const clientes = await findAllClientes();
    res.status(200).json(clientes);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getCliente = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/clientes/{id}:
   *   get:
   *     summary: Obtener un cliente por su ID
   *     tags: [Clientes]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID del cliente
   *     responses:
   *       200:
   *         description: Datos del cliente
   *       404:
   *         description: Cliente no encontrado
   */
  try {
    const id = Number(req.params.id);
    const cliente = await findClienteById(id);

    if (!cliente) {
      res.status(404).json({ message: "Cliente no encontrado" });
      return;
    }

    res.status(200).json(cliente);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const postCliente = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/clientes:
   *   post:
   *     summary: Registrar un nuevo cliente
   *     tags: [Clientes]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/ClienteDTO'
   *     responses:
   *       201:
   *         description: Cliente registrado correctamente
   *       400:
   *         description: Nombre obligatorio
   *       409:
   *         description: Correo electrónico ya registrado
   */
  try {
    const { nombre, telefono, email } = req.body;

    if (!nombre) {
      res.status(400).json({ message: "El nombre es obligatorio" });
      return;
    }

    if (email) {
      const emailExistente = await findClienteByEmail(email);
      if (emailExistente) {
        res.status(409).json({
          message: "El correo electrónico ya se encuentra registrado",
        });
        return;
      }
    }

    const nuevoCliente = await createCliente({ nombre, telefono, email });
    res.status(201).json(nuevoCliente);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const putCliente = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/clientes/{id}:
   *   put:
   *     summary: Actualizar datos de un cliente
   *     tags: [Clientes]
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
   *             $ref: '#/components/schemas/ClienteDTO'
   *     responses:
   *       200:
   *         description: Cliente actualizado
   *       400:
   *         description: Error al actualizar
   */
  try {
    const id = Number(req.params.id);
    const { nombre, telefono, email } = req.body;

    const clienteActualizado = await updateCliente(id, {
      nombre,
      telefono,
      email,
    });
    res.status(200).json(clienteActualizado);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const removeCliente = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/clientes/{id}:
   *   delete:
   *     summary: Eliminar un cliente por su ID (Solo Dueño)
   *     tags: [Clientes]
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
   *         description: Cliente eliminado correctamente
   *       400:
   *         description: No se puede eliminar si posee vehículos asociados
   *       403:
   *         description: Requiere rol DUENO
   */
  try {
    const id = Number(req.params.id);
    await deleteCliente(id);
    res.status(200).json({ message: "Cliente eliminado correctamente" });
  } catch (error: any) {
    res.status(400).json({
      message:
        "No se puede eliminar el cliente porque tiene vehículos asociados",
    });
  }
};
