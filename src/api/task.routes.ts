import { Router } from "express";
import { verificarToken } from "./auth.middleware";
import { crear, listar, obtener, actualizar, eliminar } from "../controllers/task.controller";
const router = Router();

// Todas las rutas de tareas pasan primero por el middleware
router.use(verificarToken);

// POST /tasks
router.post("/", crear);

// GET /tasks
router.get("/", listar);

// GET /tasks/:id
router.get("/:id", obtener);

// PUT /tasks/:id
router.put("/:id", actualizar);

// DELETE /tasks/:id
router.delete("/:id", eliminar);

export default router;