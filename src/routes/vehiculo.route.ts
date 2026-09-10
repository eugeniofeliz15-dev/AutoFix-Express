import { Router } from "express";
import {
  getVehiculos,
  getVehiculo,
  getVehiculoPorPlaca,
  postVehiculo,
  putVehiculo,
  removeVehiculo,
} from "../controllers/vehiculo.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.use(verifyToken);

router.get(
  "/",
  checkRole(Role.RECEPCIONISTA, Role.MECANICO, Role.DUENO),
  getVehiculos,
);
router.get(
  "/placa/:placa",
  checkRole(Role.RECEPCIONISTA, Role.MECANICO, Role.DUENO),
  getVehiculoPorPlaca,
);
router.get(
  "/:id",
  checkRole(Role.RECEPCIONISTA, Role.MECANICO, Role.DUENO),
  getVehiculo,
);
router.post("/", checkRole(Role.RECEPCIONISTA, Role.DUENO), postVehiculo);
router.put("/:id", checkRole(Role.RECEPCIONISTA, Role.DUENO), putVehiculo);
router.delete("/:id", checkRole(Role.DUENO), removeVehiculo);

export default router;
