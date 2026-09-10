import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Role } from "../generated/prisma/client.js";

export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    id: number;
    email: string;
    rol: Role;
  };
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Token de acceso no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      id: number;
      email: string;
      rol: Role;
    };
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Token inválido o expirado" });
    return;
  }
};

export const checkRole = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !allowedRoles.includes(req.user.rol)) {
      res
        .status(403)
        .json({ message: "Acceso denegado: permisos insuficientes" });
      return;
    }
    next();
  };
};
