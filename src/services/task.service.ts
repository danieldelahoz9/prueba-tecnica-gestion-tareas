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