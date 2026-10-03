import jwt from "jsonwebtoken";
import config from "../config/config";
import bcrypt from "bcrypt";
import { UserModel } from "../persistence/user.model";

// Función que registra un usuario nuevo
export async function registrarUsuario(
  nombre: string,
  email: string,
  password: string
) {
  // Primero busco si ya existe un usuario con ese email
  const usuarioExistente = await UserModel.findOne({ email: email });
  if (usuarioExistente) {
    throw new Error("El email ya está registrado");
  }

  // Encripto la contraseña, nunca se guarda en texto plano
  // El 10 es la cantidad de "rondas" de encriptación
  const passwordEncriptada = await bcrypt.hash(password, 10);

  // Creo y guardo el usuario con la contraseña ya encriptada
  const usuarioNuevo = await UserModel.create({
    nombre: nombre,
    email: email,
    password: passwordEncriptada,
  });

  return usuarioNuevo;

  }

  // Función que inicia sesión y devuelve un token
export async function iniciarSesion(email: string, password: string) {
  // Busco al usuario por su email
  const usuario = await UserModel.findOne({ email: email });
  if (!usuario) {
    throw new Error("Credenciales incorrectas");
  }

  // Comparo la contraseña escrita con el hash guardado
  const passwordCorrecta = await bcrypt.compare(password, usuario.password);
  if (!passwordCorrecta) {
    throw new Error("Credenciales incorrectas");
  }

  // Creo el token con el id del usuario, válido por 1 hora
  const token = jwt.sign({ id: usuario._id }, config.jwtSecret, {
    expiresIn: "1h",
  });

  return token;

}