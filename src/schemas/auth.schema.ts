import z from "zod";

export const RegisterSchema = z.object({
  nombre: z
    .string({ error: "El nombre es obligatorio" })
    .min(3, "El nombre es requerido y debe tener al menos 3 caracteres")
    .trim(),
  email: z
    .string({ error: "El email es obligatorio" })
    .email("El email no es valido")
    .toLowerCase()
    .trim(),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  rol: z.enum(["DUENO", "RECEPCIONISTA", "MECANICO"], {
    message: "El rol no es valido",
  }),
});

export const LoginSchema = z.object({
  email: z
    .string({ error: "El email es obligatorio" })
    .email("El email no es valido")
    .toLowerCase()
    .trim(),
  password: z
    .string({ error: "La contraseña es obligatoria" })
    .min(1, "La contraseña no puede estar vacia"),
});
