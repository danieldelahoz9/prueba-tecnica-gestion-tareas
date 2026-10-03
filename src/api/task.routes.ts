import { Router } from "express";
import { verificarToken } from "./auth.middleware";
import { crear, listar } from "../controllers/task.controller";

const router = Router();

// Todas las rutas de tareas pasan primero por el middleware
router.use(verificarToken);

// POST /tasks
router.post("/", crear);

// GET /tasks
router.get("/", listar);

export default router;