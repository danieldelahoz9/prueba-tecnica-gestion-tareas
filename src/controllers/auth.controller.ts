import { Request, Response, NextFunction } from "express";
import { registrarUsuario, iniciarSesion } from "../services/auth.service";
import { ValidationError } from "../utils/errors";

// Controlador del endpoint POST /auth/register
export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;

    if (!nombre || !email || !password) {
      throw new ValidationError("Faltan datos: nombre, email y password");
    }

    const usuario = await registrarUsuario(nombre, email, password);

    // Respondo SIN la contraseña, nunca la devuelvo
    res.status(201).json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
    });
  } catch (error) {
    next(error);
  }
}

// Controlador del endpoint POST /auth/login
export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      throw new ValidationError("Faltan datos: email y password");
    }

    const token = await iniciarSesion(email, password);
    res.status(200).json({ token: token });
  } catch (error) {
    next(error);
  }
}