import { Router } from "express";
import {
  getClientes,
  getCliente,
  postCliente,
  putCliente,
  removeCliente,
} from "../controllers/cliente.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import {
  ClienteSchema,
  ClienteUpdateSchema,
} from "../schemas/cliente.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(verifyToken);

router.get("/", checkRole("RECEPCIONISTA", "DUENO"), getClientes);
router.get("/:id", checkRole("RECEPCIONISTA", "DUENO"), getCliente);
router.post(
  "/",
  checkRole("RECEPCIONISTA", "DUENO"),
  validate(ClienteSchema),
  postCliente,
);
router.put(
  "/:id",
  checkRole("RECEPCIONISTA", "DUENO"),
  validate(ClienteUpdateSchema),
  putCliente,
);
router.delete("/:id", checkRole("DUENO"), removeCliente);

export default router;
