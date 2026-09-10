import { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        const errors = error.issues.map((err) => ({
          campo: err.path.join("."),
          mensaje: err.message,
        }));
        res.status(400).json({
          status: "error",
          mensaje: "Error de validacion de datos",
          errores: errors,
        });
        return;
      }
      res.status(500).json({ mensaje: "Error interno de validacion" });
    }
  };
};
