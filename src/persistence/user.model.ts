import mongoose from "mongoose";

// Esta interfaz le dice a TypeScript qué campos tiene un usuario
export interface IUser {
  nombre: string;
  email: string;
  password: string;
}

// El esquema le dice a Mongoose cómo guardar el usuario en la base de datos
const userSchema = new mongoose.Schema<IUser>(
  {
    nombre: { type: String, required: true },
    // unique evita que se registren dos usuarios con el mismo email
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  // timestamps agrega solos los campos createdAt y updatedAt
  { timestamps: true }
);

// Creo el modelo "User", que es el que usaremos para guardar y buscar usuarios
export const UserModel = mongoose.model<IUser>("User", userSchema);