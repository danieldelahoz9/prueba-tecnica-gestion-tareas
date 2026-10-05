import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validarBody } from "./validar.middleware";
import { esquemaRegistro, esquemaLogin } from "../utils/schemas";

// Router que agrupa las rutas de autenticación
const router = Router();

// POST /auth/register
router.post("/register", validarBody(esquemaRegistro), register);

// POST /auth/login
router.post("/login", validarBody(esquemaLogin), login);

export default router;