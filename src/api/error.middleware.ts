import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/errors";

// Middleware de errores: Express lo reconoce porque tiene 4 parámetros
export function manejarErrores(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Si es un error nuestro, respondo con su código y su mensaje
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      error: error.name,
      mensaje: error.message,
    });
    return;
  }

  // Si es cualquier otro error, lo muestro en consola y respondo 500
  // sin revelar detalles internos al usuario
  console.log(error);
  res.status(500).json({
    error: "InternalServerError",
    mensaje: "Error interno del servidor",
  });
}