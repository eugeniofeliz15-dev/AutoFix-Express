import { Router } from "express";
import {
  register,
  login,
  getMecanicos,
} from "../controllers/auth.controller.js";
import { verifyToken, checkRole } from "../middlewares/auth.middleware.js";
import { Role } from "../generated/prisma/client.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get(
  "/mecanicos",
  verifyToken,
  checkRole(Role.RECEPCIONISTA, Role.DUENO),
  getMecanicos,
);

export default router;
