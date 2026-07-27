import { Router } from 'express';
import {
  getAllAdoptions,
  getAdoptionById,
  createAdoption,
} from '../controllers/adoption.controller.js';

const router = Router();

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     description: Devuelve el listado completo de registros de adopción
 *     tags:
 *       - Adoptions
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida correctamente
 */
router.get('/', getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     description: Devuelve un registro de adopción específico según su ID
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - in: path
 *         name: aid
 *         required: true
 *         description: ID de la adopción
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Adopción encontrada correctamente
 *       404:
 *         description: Adopción no encontrada
 */
router.get('/:aid', getAdoptionById);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Registrar una nueva adopción
 *     description: Vincula a un usuario con una mascota para generar un registro de adopción
 *     tags:
 *       - Adoptions
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *       - in: path
 *         name: pid
 *         required: true
 *         description: ID de la mascota
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Adopción creada exitosamente
 *       400:
 *         description: Datos inválidos o la mascota ya fue adoptada
 *       404:
 *         description: Usuario o mascota no encontrados
 */
router.post('/:uid/:pid', createAdoption);

export default router;
