import { Router } from 'express';
import { getPets, createPet } from '../controllers/pets.controller.js';

const router = Router();

/**
 * @swagger
 * /api/pets:
 *   get:
 *     summary: Obtener el listado de mascotas
 *     tags:
 *       - Pets
 *     responses:
 *       200:
 *         description: Lista de mascotas obtenida exitosamente
 */
router.get('/', getPets);

/**
 * @swagger
 * /api/pets:
 *   post:
 *     summary: Registrar una nueva mascota
 *     tags:
 *       - Pets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specie:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota registrada exitosamente
 */
router.post('/', createPet);

export default router;
