import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  findUsuarioByEmail,
  createUsuario,
  findMecanicosDisponibles,
} from "../models/auth.model.js";

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints de autenticación y usuarios
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Registrar un nuevo usuario
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/RegisterDTO'
   *     responses:
   *       201:
   *         description: Usuario creado exitosamente
   *       400:
   *         description: Correo ya registrado o datos inválidos
   */
  try {
    const { nombre, email, password } = req.body;
    const rol = req.body.rol || req.body.role;

    const existe = await findUsuarioByEmail(email);
    if (existe) {
      res
        .status(400)
        .json({ message: "El correo electrónico ya se encuentra registrado" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUsuario(nombre, email, hashedPassword, rol);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Iniciar sesión y recibir token JWT
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/LoginDTO'
   *     responses:
   *       200:
   *         description: Login exitoso, retorna el token y datos de usuario
   *       401:
   *         description: Credenciales incorrectas
   */
  try {
    const { email, password } = req.body;

    const user = await findUsuarioByEmail(email);
    if (!user) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ message: "Credenciales inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "8h" },
    );

    res.status(200).json({
      token,
      usuario: {
        id: user.id,
        nombre: user.nombre,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMecanicos = async (
  _req: Request,
  res: Response,
): Promise<void> => {
  /**
   * @swagger
   * /api/auth/mecanicos:
   *   get:
   *     summary: Listar todos los mecánicos disponibles
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de mecánicos
   *       401:
   *         description: No autenticado
   *       403:
   *         description: Acceso no autorizado (Requiere RECEPCIONISTA o DUENO)
   */
  try {
    const mecanicos = await findMecanicosDisponibles();
    res.status(200).json(mecanicos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
