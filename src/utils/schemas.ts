// Esquema para POST /auth/register
export const esquemaRegistro = {
  type: "object",
  properties: {
    nombre: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 6 },
  },
  required: ["nombre", "email", "password"],
  additionalProperties: false,
};

// Esquema para POST /auth/login
export const esquemaLogin = {
  type: "object",
  properties: {
    email: { type: "string", format: "email" },
    password: { type: "string", minLength: 1 },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

// Esquema para POST /tasks
export const esquemaCrearTarea = {
  type: "object",
  properties: {
    titulo: { type: "string", minLength: 1 },
    descripcion: { type: "string" },
    fecha_vencimiento: { type: "string", format: "date" },
    estado: { type: "string", enum: ["pendiente", "en curso", "completada"] },
  },
  required: ["titulo", "fecha_vencimiento"],
  additionalProperties: false,
};

// Esquema para PUT /tasks/:id (todos los campos son opcionales)
export const esquemaActualizarTarea = {
  type: "object",
  properties: {
    titulo: { type: "string", minLength: 1 },
    descripcion: { type: "string" },
    fecha_vencimiento: { type: "string", format: "date" },
    estado: { type: "string", enum: ["pendiente", "en curso", "completada"] },
  },
  additionalProperties: false,
};