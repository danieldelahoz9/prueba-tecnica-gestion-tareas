import mongoose from "mongoose";
import config from "./config";

// Función que conecta la aplicación con MongoDB
export async function conectarBaseDeDatos() {
  // Intento conectarme usando la dirección que está en el .env
  await mongoose.connect(config.mongodbUri);
  console.log("Conectado a MongoDB");
}