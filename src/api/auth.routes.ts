import { Router } from "express";
import { register } from "../controllers/auth.controller";

// Router que agrupa las rutas de autenticación
const router = Router();

// POST /auth/register
router.post("/register", register);

export default router;