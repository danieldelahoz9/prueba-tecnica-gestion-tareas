import { Response } from "express";
import { RequestConUsuario } from "../utils/types";
import { crearTarea, listarTareas } from "../services/task.service";

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