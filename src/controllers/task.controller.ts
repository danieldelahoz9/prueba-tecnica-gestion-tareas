import { Response, NextFunction } from "express";
import mongoose from "mongoose";
import { RequestConUsuario } from "../utils/types";
import { EstadoTarea } from "../persistence/task.model";
import {
  AuthenticationError,
  ValidationError,
  NotFoundError,
} from "../utils/errors";
import {
  crearTarea,
  listarTareas,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea,
} from "../services/task.service";

// Función de ayuda: revisa que el texto sea uno de los tres estados
function esEstadoValido(estado: string): estado is EstadoTarea {
  return (
    estado === "pendiente" || estado === "en curso" || estado === "completada"
  );
}

// Controlador del endpoint POST /tasks
export async function crear(
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) {
  try {
    const usuarioId = req.usuarioId;
    const titulo = req.body.titulo;
    const descripcion = req.body.descripcion || "";
    const fechaTexto = req.body.fecha_vencimiento;
    const estado = req.body.estado || "pendiente";

    if (!usuarioId) {
      throw new AuthenticationError("No autenticado");
    }

    if (!titulo || !fechaTexto) {
      throw new ValidationError("Faltan datos: titulo y fecha_vencimiento");
    }

    const fechaVencimiento = new Date(fechaTexto);
    if (isNaN(fechaVencimiento.getTime())) {
      throw new ValidationError("La fecha_vencimiento no es válida");
    }

    if (!esEstadoValido(estado)) {
      throw new ValidationError("Estado no válido");
    }

    const tarea = await crearTarea(
      usuarioId,
      titulo,
      descripcion,
      fechaVencimiento,
      estado
    );
    res.status(201).json(tarea);
  } catch (error) {
    next(error);
  }
}

// Controlador del endpoint GET /tasks
export async function listar(
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) {
  try {
    const usuarioId = req.usuarioId;

    if (!usuarioId) {
      throw new AuthenticationError("No autenticado");
    }

    const tareas = await listarTareas(usuarioId);
    res.status(200).json(tareas);
  } catch (error) {
    next(error);
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
    next(error);
  }
}

// Controlador del endpoint PUT /tasks/:id
export async function actualizar(
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
        throw new ValidationError("La fecha_vencimiento no es válida");
      }
      datos.fecha_vencimiento = fecha;
    }

    if (req.body.estado) {
      if (!esEstadoValido(req.body.estado)) {
        throw new ValidationError("Estado no válido");
      }
      datos.estado = req.body.estado;
    }

    const tarea = await actualizarTarea(usuarioId, tareaId, datos);

    if (!tarea) {
      throw new NotFoundError("Tarea no encontrada");
    }

    res.status(200).json(tarea);
  } catch (error) {
    next(error);
  }
}

// Controlador del endpoint DELETE /tasks/:id
export async function eliminar(
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

    const tarea = await eliminarTarea(usuarioId, tareaId);

    if (!tarea) {
      throw new NotFoundError("Tarea no encontrada");
    }

    res.status(200).json({ mensaje: "Tarea eliminada" });
  } catch (error) {
    next(error);
  }
}