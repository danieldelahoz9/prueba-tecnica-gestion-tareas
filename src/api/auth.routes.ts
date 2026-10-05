import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validarBody } from "./validar.middleware";
import { esquemaRegistro, esquemaLogin } from "../utils/schemas";

// Router que agrupa las rutas de autenticación
const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un usuario nuevo
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, email, password]
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado
 *       400:
 *         description: Datos no válidos
 *       409:
 *         description: El email ya está registrado
 */
// POST /auth/register
router.post("/register", validarBody(esquemaRegistro), register);

// POST /auth/login
router.post("/login", validarBody(esquemaLogin), login);

export default router;