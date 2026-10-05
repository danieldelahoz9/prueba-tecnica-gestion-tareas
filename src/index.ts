import swaggerUi from "swagger-ui-express";
import { especificacion } from "./config/swagger";
import { manejarErrores } from "./api/error.middleware";
import taskRoutes from "./api/task.routes";
import authRoutes from "./api/auth.routes";
import express from "express";
import config from "./config/config";
import { conectarBaseDeDatos } from "./config/database";

// Creo la aplicación de Express
const app = express();

// Esto permite que el servidor entienda JSON en las peticiones
app.use(express.json());

//esto conecta la ruta 
app.use("/auth", authRoutes);

app.use("/tasks", taskRoutes);

// Ruta de prueba para comprobar que el servidor funciona
app.get("/health", (req, res) => {
  res.json({ mensaje: "El servidor está funcionando" });
  
});

// Documentación en http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(especificacion));

// Siempre va al final, después de las rutas
app.use(manejarErrores);

// Función que primero conecta la base de datos y luego enciende el servidor
async function iniciarServidor() {
  // Si la conexión falla, muestro el error y detengo el programa
  try {
    await conectarBaseDeDatos();
  } catch (error) {
    console.log("No se pudo conectar a MongoDB");
    console.log(error);
    process.exit(1);
  }

  app.listen(config.port, () => {
    console.log("Servidor corriendo en el puerto " + config.port);
  });
}

iniciarServidor();