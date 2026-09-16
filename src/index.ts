import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import clienteRoutes from "./routes/cliente.route.js";
import vehiculoRoutes from "./routes/vehiculo.route.js";
import detalleRepuestoOrdenRoutes from "./routes/detalleRepuestoOrden.route.js";
import { setupSwagger } from "./config/swagger.js";
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json' with { type: 'json' };
import { prisma } from './lib/prisma.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
setupSwagger(app);

app.use(cors());
app.use(express.json());

// Registro de endpoints de la API
app.use("/api/auth", authRoutes);
app.use("/api/clientes", clienteRoutes);
app.use("/api/vehiculos", vehiculoRoutes);
app.use("/api/detalles-repuestos-orden", detalleRepuestoOrdenRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AutoFix Express API lista en http://localhost:${PORT}`);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
  res.json({ 
    message: ' AutoFix-Express API está funcionando', 
    status: 'OK'
  });
});

app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ message: '✅ Conexión a la base de datos exitosa' });
  } catch (error) {
    res.status(500).json({ message: '❌ Error de conexión', error });
  }
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
