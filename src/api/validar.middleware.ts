import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { ValidationError } from "../utils/errors";

// Creo AJV una sola vez; allErrors muestra todos los errores juntos
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Recibe un esquema y devuelve un middleware que valida el body con él
export function validarBody(esquema: object) {
  const validar = ajv.compile(esquema);

  return (req: Request, res: Response, next: NextFunction) => {
    const esValido = validar(req.body);

    if (!esValido) {
      // Armo un mensaje legible con los errores encontrados
      const detalles: string[] = [];
      const errores = validar.errors || [];
      for (let i = 0; i < errores.length; i++) {
        const ruta = errores[i].instancePath || "body";
        detalles.push(ruta + " " + errores[i].message);
      }
      next(new ValidationError(detalles.join("; ")));
      return;
    }

    next();
  };
}