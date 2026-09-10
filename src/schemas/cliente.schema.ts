import z from "zod";

export const ClienteSchema = z.object({
  nombre: z
    .string({ error: "El nombre es obligatorio" })
    .min(3, "El nombre es requerido y debe tener al menos 3 caracteres")
    .trim(),
  telefono: z
    .string({ error: "El teléfono es obligatorio" })
    .min(8, "El teléfono debe tener al menos 8 caracteres")
    .max(15, "El teléfono no puede tener más de 15 caracteres")
    .trim()
    .optional(),
  email: z
    .string({ error: "El email es obligatorio" })
    .email("El email no es valido")
    .toLowerCase()
    .trim()
    .optional(),
});

export const ClienteUpdateSchema = ClienteSchema.partial();
