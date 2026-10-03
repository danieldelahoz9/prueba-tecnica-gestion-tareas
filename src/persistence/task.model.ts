import mongoose from "mongoose";

// Los tres estados que permite la prueba
export type EstadoTarea = "pendiente" | "en curso" | "completada";

// Esta interfaz le dice a TypeScript qué campos tiene una tarea
export interface ITask {
  titulo: string;
  descripcion: string;
  fecha_vencimiento: Date;
  estado: EstadoTarea;
  usuario: mongoose.Types.ObjectId;
}

const taskSchema = new mongoose.Schema<ITask>(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, default: "" },
    fecha_vencimiento: { type: Date, required: true },
    // enum limita los valores posibles del estado
    estado: {
      type: String,
      enum: ["pendiente", "en curso", "completada"],
      default: "pendiente",
    },
    // Aquí guardo el id del usuario dueño de la tarea
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<ITask>("Task", taskSchema);