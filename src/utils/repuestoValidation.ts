import { z } from "zod";

export const repuestoSchema = z.object({
  nombre: z
    .string()
    .min(1, "El nombre es obligatorio"),

  precio: z
    .number()
    .positive("El precio debe ser mayor que 0"),

  stock: z
    .number()
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo")
    .optional(),
});

export const actualizarRepuestoSchema = repuestoSchema.partial();