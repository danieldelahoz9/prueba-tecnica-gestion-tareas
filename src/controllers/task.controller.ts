import { NextFunction } from "express";
import { AuthenticationError, ValidationError, NotFoundError } from "../utils/errors";
import { Response } from "express";
import { RequestConUsuario } from "../utils/types";
import mongoose from "mongoose";
import { EstadoTarea } from "../persistence/task.model";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
} from "../services/task.service";

// Controlador del endpoint POST /tasks
export async function crear(req: RequestConUsuario, res: Response) {
  const usuarioId = req.usuarioId;
  const titulo = req.body.titulo;
  const descripcion = req.body.descripcion || "";
  const fechaTexto = req.body.fecha_vencimiento;
  const estado = req.body.estado || "pendiente";

  // Si por alguna razón no hay usuario, no sigo
  if (!usuarioId) {
    res.status(401).json({ mensaje: "No autenticado" });
    return;
  }

  // Validaciones simples con if
  if (!titulo || !fechaTexto) {
    res.status(400).json({ mensaje: "Faltan datos: titulo y fecha_vencimiento" });
    return;
  }

  const fechaVencimiento = new Date(fechaTexto);
  if (isNaN(fechaVencimiento.getTime())) {
    res.status(400).json({ mensaje: "La fecha_vencimiento no es válida" });
    return;
  }

  if (estado !== "pendiente" && estado !== "en curso" && estado !== "completada") {
    res.status(400).json({ mensaje: "Estado no válido" });
    return;
  }

  try {
    const tarea = await crearTarea(usuarioId, titulo, descripcion, fechaVencimiento, estado);
    res.status(201).json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo crear la tarea" });
  }
}

// Controlador del endpoint GET /tasks
export async function listar(req: RequestConUsuario, res: Response) {
  const usuarioId = req.usuarioId;

  if (!usuarioId) {
    res.status(401).json({ mensaje: "No autenticado" });
    return;
  }

  try {
    const tareas = await listarTareas(usuarioId);
    res.status(200).json(tareas);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudieron obtener las tareas" });
  }
}

// Controlador del endpoint GET /tasks/:id
export async function obtener(
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) {
  try {
    const usuarioId = req.usuarioId;
    const tareaId = String(req.params.id);

    if (!usuarioId) {
      throw new AuthenticationError("No autenticado");
    }

    if (!mongoose.isValidObjectId(tareaId)) {
      throw new ValidationError("El id de la tarea no es válido");
    }

    const tarea = await obtenerTarea(usuarioId, tareaId);

    if (!tarea) {
      throw new NotFoundError("Tarea no encontrada");
    }

    res.status(200).json(tarea);
  } catch (error) {
    // Paso el error al manejador centralizado
    next(error);
  }
}

// Controlador del endpoint PUT /tasks/:id
export async function actualizar(req: RequestConUsuario, res: Response) {
  const usuarioId = req.usuarioId;
  const tareaId = String(req.params.id);

  if (!usuarioId) {
    res.status(401).json({ mensaje: "No autenticado" });
    return;
  }

  if (!mongoose.isValidObjectId(tareaId)) {
    res.status(400).json({ mensaje: "El id de la tarea no es válido" });
    return;
  }

  // Aquí voy armando solo los campos que el usuario sí envió
  const datos: {
    titulo?: string;
    descripcion?: string;
    fecha_vencimiento?: Date;
    estado?: EstadoTarea;
  } = {};

  if (req.body.titulo) {
    datos.titulo = req.body.titulo;
  }

  if (req.body.descripcion !== undefined) {
    datos.descripcion = req.body.descripcion;
  }

  if (req.body.fecha_vencimiento) {
    const fecha = new Date(req.body.fecha_vencimiento);
    if (isNaN(fecha.getTime())) {
      res.status(400).json({ mensaje: "La fecha_vencimiento no es válida" });
      return;
    }
    datos.fecha_vencimiento = fecha;
  }

  if (req.body.estado) {
    const estado = req.body.estado;
    if (estado !== "pendiente" && estado !== "en curso" && estado !== "completada") {
      res.status(400).json({ mensaje: "Estado no válido" });
      return;
    }
    datos.estado = estado;
  }

  try {
    const tarea = await actualizarTarea(usuarioId, tareaId, datos);

    if (!tarea) {
      res.status(404).json({ mensaje: "Tarea no encontrada" });
      return;
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo actualizar la tarea" });
  }
}

// Controlador del endpoint DELETE /tasks/:id
export async function eliminar(req: RequestConUsuario, res: Response) {
  const usuarioId = req.usuarioId;
  const tareaId = String(req.params.id);

  if (!usuarioId) {
    res.status(401).json({ mensaje: "No autenticado" });
    return;
  }

  if (!mongoose.isValidObjectId(tareaId)) {
    res.status(400).json({ mensaje: "El id de la tarea no es válido" });
    return;
  }

  try {
    const tarea = await eliminarTarea(usuarioId, tareaId);

    if (!tarea) {
      res.status(404).json({ mensaje: "Tarea no encontrada" });
      return;
    }

    res.status(200).json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ mensaje: "No se pudo eliminar la tarea" });
  }
}

