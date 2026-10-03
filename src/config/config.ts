import dotenv from "dotenv";

// Leo el archivo .env una sola vez
dotenv.config();

// Clase que guarda toda la configuración de la aplicación
class Config {
  // Aquí se guarda la única instancia que va a existir
  private static instancia: Config;

  public readonly port: number;
  public readonly mongodbUri: string;
  public readonly jwtSecret: string;

  // El constructor es privado: nadie puede hacer "new Config()" desde afuera
  private constructor() {
    this.port = Number(process.env.PORT) || 3000;
    this.mongodbUri = process.env.MONGODB_URI || "";
    this.jwtSecret = process.env.JWT_SECRET || "";

    // Validaciones simples: si falta algo importante, aviso de una vez
    if (this.mongodbUri === "") {
      throw new Error("Falta MONGODB_URI en el archivo .env");
    }
    if (this.jwtSecret === "") {
      throw new Error("Falta JWT_SECRET en el archivo .env");
    }
  }

  // Si la instancia no existe la creo, si ya existe devuelvo la misma
  public static getInstance(): Config {
    if (!Config.instancia) {
      Config.instancia = new Config();
    }
    return Config.instancia;
  }
}

// Exporto directamente la instancia ya creada
export default Config.getInstance();