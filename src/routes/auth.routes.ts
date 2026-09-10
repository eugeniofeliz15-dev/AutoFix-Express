import { Router } from "express";
import {
  register,
  login,
  getMecanicos,
} from "../controllers/auth.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import { RegisterSchema, LoginSchema } from "../schemas/auth.schema.js";
import { validate } from "../middlewares/validate.middleware.js";

const router = Router();

router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);
router.get(
  "/mecanicos",
  verifyToken,
  checkRole("RECEPCIONISTA", "DUENO"),
  getMecanicos,
);

export default router;
