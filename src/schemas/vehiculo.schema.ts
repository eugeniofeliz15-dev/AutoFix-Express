import z from "zod";

export const VehiculoSchema = z.object({
  placa: z
    .string({ error: "La placa es obligatoria" })
    .min(4, "La placa debe tener al menos 4 caracteres")
    .toUpperCase()
    .trim(),
  marca: z
    .string({ error: "La marca es obligatoria" })
    .min(2, "La marca debe tener al menos 2 caracteres")
    .trim(),
  modelo: z
    .string({ error: "El modelo es obligatorio" })
    .min(2, "El modelo debe tener al menos 2 caracteres")
    .trim(),
  clienteId: z
    .number({ error: "El clienteId es obligatorio" })
    .int("El clienteId debe ser un número entero")
    .positive("El clienteId debe ser un número positivo"),
});

export const VehiculoUpdateSchema = VehiculoSchema.partial();
