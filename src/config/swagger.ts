import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { Role } from "../generated/prisma/enums.js";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AutoFix Express API",
      version: "1.0.0",
      description: "Documentación interactiva con Swagger para AutoFix Express",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Coloca el token JWT obtenido del login",
        },
      },

      schemas: {
        RoleEnum: {
          type: "string",
          enum: ["DUENO", "RECEPCIONISTA", "MECANICO"],
        },
        RegisterDTO: {
          type: "object",
          required: ["nombre", "email", "password", "role"],
          properties: {
            nombre: { type: "string", example: "Pedro Armas" },
            email: {
              type: "string",
              format: "email",
              example: "pedro@autofix.com",
            },
            password: { type: "string", example: "123456" },
            rol: { $ref: "#/components/schemas/RoleEnum" },
          },
        },
        LoginDTO: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "dueno@autofix.com",
            },
            password: { type: "string", example: "123456" },
          },
        },
        ClienteDTO: {
          type: "object",
          required: ["nombre"],
          properties: {
            nombre: { type: "string", example: "Juan Pérez" },
            telefono: { type: "string", example: "77234567" },
            email: {
              type: "string",
              format: "email",
              example: "juan.perez@email.com",
            },
          },
        },
        VehiculoDTO: {
          type: "object",
          required: ["placa", "marca", "modelo", "clienteId"],
          properties: {
            placa: { type: "string", example: "4589-KLP" },
            marca: { type: "string", example: "Toyota" },
            modelo: { type: "string", example: "Corolla 2018" },
            clienteId: { type: "integer", example: 1 },
          },
        },
      },
    },
  },
  // Lee los comentarios JSDoc directamente de tus controladores
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express): void => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    "Documentación Swagger disponible en: http://localhost:3000/api/docs",
  );
};
