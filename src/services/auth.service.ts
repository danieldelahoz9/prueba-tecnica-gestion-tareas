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