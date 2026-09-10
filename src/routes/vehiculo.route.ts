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
import {
  VehiculoSchema,
  VehiculoUpdateSchema,
} from "../schemas/vehiculo.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.use(verifyToken);

router.get("/", checkRole("RECEPCIONISTA", "MECANICO", "DUENO"), getVehiculos);
router.get(
  "/placa/:placa",
  checkRole("RECEPCIONISTA", "MECANICO", "DUENO"),
  getVehiculoPorPlaca,
);
router.get(
  "/:id",
  checkRole("RECEPCIONISTA", "MECANICO", "DUENO"),
  getVehiculo,
);
router.post(
  "/",
  checkRole("RECEPCIONISTA", "DUENO"),
  validate(VehiculoSchema),
  postVehiculo,
);
router.put(
  "/:id",
  checkRole("RECEPCIONISTA", "DUENO"),
  validate(VehiculoUpdateSchema),
  putVehiculo,
);
router.delete("/:id", checkRole("DUENO"), removeVehiculo);

export default router;
