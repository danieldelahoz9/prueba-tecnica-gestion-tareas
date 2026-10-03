import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { RequestConUsuario } from "../utils/types";

// Middleware que revisa que la petición traiga un token válido
export function verificarToken(
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) {
  // El token viene en la cabecera: Authorization: Bearer <token>
  const cabecera = req.headers.authorization;

  // Si no hay cabecera o no empieza con "Bearer ", no lo dejo pasar
  if (!cabecera || !cabecera.startsWith("Bearer ")) {
    res.status(401).json({ mensaje: "Token no enviado" });
    return;
  }

  // Quito la palabra "Bearer " para quedarme solo con el token
  const token = cabecera.split(" ")[1];

  try {
    // Verifico la firma y la fecha de vencimiento con el JWT_SECRET
    const datos = jwt.verify(token, config.jwtSecret) as { id: string };

    // Guardo el id del usuario para que lo use el controlador
    req.usuarioId = datos.id;

    // Dejo pasar la petición al siguiente paso
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token inválido o vencido" });
  }
}