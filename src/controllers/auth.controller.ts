import { Request, Response } from "express";
import { registrarUsuario, iniciarSesion } from "../services/auth.service";

// Controlador del endpoint POST /auth/register
export async function register(req: Request, res: Response) {
  // Saco los datos que mandó el usuario en el cuerpo de la petición
  const nombre = req.body.nombre;
  const email = req.body.email;
  const password = req.body.password;

  // Validación simple: reviso que no falte ningún dato
  if (!nombre || !email || !password) {
    res.status(400).json({ mensaje: "Faltan datos: nombre, email y password" });
    return;
  }

  try {
    const usuario = await registrarUsuario(nombre, email, password);

    // Respondo SIN la contraseña, nunca la devuelvo
    res.status(201).json({
      id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
    });
  } catch (error) {
    res.status(400).json({ mensaje: "No se pudo registrar el usuario" });
  }
  }
// Controlador del endpoint POST /auth/login
export async function login(req: Request, res: Response) {
  const email = req.body.email;
  const password = req.body.password;

  // Validación simple: reviso que no falte ningún dato
  if (!email || !password) {
    res.status(400).json({ mensaje: "Faltan datos: email y password" });
    return;
  }

  try {
    const token = await iniciarSesion(email, password);
    res.status(200).json({ token: token });
  } catch (error) {
    // 401 significa "no autorizado"
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
}
