import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import clienteRoutes from "./routes/cliente.route.js";
import vehiculoRoutes from "./routes/vehiculo.route.js";
import { setupSwagger } from "./config/swagger.js";

dotenv.config();

const app = express();
setupSwagger(app);

app.use(cors());
app.use(express.json());

// Registro de endpoints de la API
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/vehiculos", vehiculoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AutoFix Express API lista en http://localhost:${PORT}`);
});
