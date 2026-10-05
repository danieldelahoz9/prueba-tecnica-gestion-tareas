import swaggerJSDoc from "swagger-jsdoc";

// Configuración general de la documentación
const opciones: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Tareas",
      version: "1.0.0",
      description:
        "API para registrar usuarios, iniciar sesión y administrar tareas personales.",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      // Esto agrega el botón "Authorize" para pegar el token JWT
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Tarea: {
          type: "object",
          properties: {
            _id: { type: "string" },
            titulo: { type: "string" },
            descripcion: { type: "string" },
            fecha_vencimiento: { type: "string", format: "date-time" },
            estado: {
              type: "string",
              enum: ["pendiente", "en curso", "completada"],
            },
            usuario: { type: "string" },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: { type: "string" },
            mensaje: { type: "string" },
          },
        },
      },
    },
  },
  // Aquí le digo dónde buscar los comentarios @swagger
  apis: ["./src/api/*.ts"],
};

export const especificacion = swaggerJSDoc(opciones);
