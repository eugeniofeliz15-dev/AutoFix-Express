import { Router } from "express";
import {
  getClientes,
  getCliente,
  postCliente,
  putCliente,
  removeCliente,
} from "../controllers/cliente.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.use(verifyToken);

router.get("/", checkRole(Role.RECEPCIONISTA, Role.DUENO), getClientes);
router.get("/:id", checkRole(Role.RECEPCIONISTA, Role.DUENO), getCliente);
router.post("/", checkRole(Role.RECEPCIONISTA, Role.DUENO), postCliente);
router.put("/:id", checkRole(Role.RECEPCIONISTA, Role.DUENO), putCliente);
router.delete("/:id", checkRole(Role.DUENO), removeCliente);

export default router;
