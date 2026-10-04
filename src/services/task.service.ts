import { TaskModel, EstadoTarea } from "../persistence/task.model";

// Función que crea una tarea y la liga al usuario que la creó
export async function crearTarea(
  usuarioId: string,
  titulo: string,
  descripcion: string,
  fechaVencimiento: Date,
  estado: EstadoTarea
) {
  const tareaNueva = await TaskModel.create({
    titulo: titulo,
    descripcion: descripcion,
    fecha_vencimiento: fechaVencimiento,
    estado: estado,
    usuario: usuarioId,
  });

  return tareaNueva;
}

// Función que devuelve solo las tareas de un usuario
export async function listarTareas(usuarioId: string) {
  // El filtro { usuario: usuarioId } es lo que evita ver tareas de otros
  const tareas = await TaskModel.find({ usuario: usuarioId });
  return tareas;
}

// Función que busca una tarea por id, pero solo si es del usuario
export async function obtenerTarea(usuarioId: string, tareaId: string) {
  // Busco por id Y por dueño: así nadie ve tareas ajenas
  const tarea = await TaskModel.findOne({ _id: tareaId, usuario: usuarioId });
  return tarea;
}

// Función que modifica una tarea, solo si es del usuario
export async function actualizarTarea(
  usuarioId: string,
  tareaId: string,
  datos: {
    titulo?: string;
    descripcion?: string;
    fecha_vencimiento?: Date;
    estado?: EstadoTarea;
  }
) {
  // new: true hace que devuelva la tarea ya modificada
  const tarea = await TaskModel.findOneAndUpdate(
    { _id: tareaId, usuario: usuarioId },
    datos,
    { new: true }
  );
  return tarea;
}

// Función que elimina una tarea, solo si es del usuario
export async function eliminarTarea(usuarioId: string, tareaId: string) {
  const tarea = await TaskModel.findOneAndDelete({
    _id: tareaId,
    usuario: usuarioId,
  });
  return tarea;
}