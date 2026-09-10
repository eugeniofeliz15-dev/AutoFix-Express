import { Router } from "express";

import {
  getDetallesRepuestos,
  getDetalleRepuesto,
  postDetalleRepuesto,
  putDetalleRepuesto,
  removeDetalleRepuesto,
} from "../controllers/detalleRepuestoOrden.controller.js";

import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.use(verifyToken);

router.get(
  "/",
  checkRole(Role.MECANICO, Role.RECEPCIONISTA, Role.DUENO),
  getDetallesRepuestos,
);

router.get(
  "/:id",
  checkRole(Role.MECANICO, Role.RECEPCIONISTA, Role.DUENO),
  getDetalleRepuesto,
);

router.post(
  "/",
  checkRole(Role.MECANICO),
  postDetalleRepuesto,
);

router.put(
  "/:id",
  checkRole(Role.MECANICO),
  putDetalleRepuesto,
);

router.delete(
  "/:id",
  checkRole(Role.MECANICO),
  removeDetalleRepuesto,
);

export default router;