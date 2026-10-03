import { Request } from "express";

// Request normal de Express, pero con el id del usuario que inició sesión
export interface RequestConUsuario extends Request {
  usuarioId?: string;
}