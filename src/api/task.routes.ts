import { Router } from "express";
import { verificarToken } from "./auth.middleware";
import { validarBody } from "./validar.middleware";
import { esquemaCrearTarea, esquemaActualizarTarea } from "../utils/schemas";
import {
  crear,
  listar,
  obtener,
  actualizar,
  eliminar,
} from "../controllers/task.controller";

const router = Router();

// Todas las rutas de tareas pasan primero por el middleware
router.use(verificarToken);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, fecha_vencimiento]
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Estudiar para la prueba
 *               descripcion:
 *                 type: string
 *                 example: Repasar Express y JWT
 *               fecha_vencimiento:
 *                 type: string
 *                 example: "2026-10-10"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en curso, completada]
 *     responses:
 *       201:
 *         description: Tarea creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       400:
 *         description: Datos no válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token no enviado, inválido o vencido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/", validarBody(esquemaCrearTarea), crear);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tarea'
 *       401:
 *         description: Token no enviado, inválido o vencido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/", listar);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Obtener una tarea por id (solo si es del usuario)
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la tarea
 *     responses:
 *       200:
 *         description: La tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       400:
 *         description: El id no tiene formato válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token no enviado, inválido o vencido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tarea no encontrada (o no pertenece al usuario)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/:id", obtener);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Modificar una tarea propia
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_vencimiento:
 *                 type: string
 *                 example: "2026-10-15"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en curso, completada]
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Tarea'
 *       400:
 *         description: Datos o id no válidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token no enviado, inválido o vencido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tarea no encontrada (o no pertenece al usuario)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/:id", validarBody(esquemaActualizarTarea), actualizar);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea propia
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Id de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       400:
 *         description: El id no tiene formato válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Token no enviado, inválido o vencido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Tarea no encontrada (o no pertenece al usuario)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/:id", eliminar);

export default router;