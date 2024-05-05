import express from "express";
const router = express.Router();

import {
  getNiveaux,
  createNiveau,
  getNiveauById,
  updateNiveau,
  deleteNiveau,
} from "../controllers/api/niveauController.js";

/**
 * @swagger
 * tags:
 *   name: Niveaux
 *   description: API endpoints for managing niveaux
 */

/**
 * @swagger
 * /niveaux:
 *   get:
 *     summary: Get all niveaux
 *     tags: [Niveaux]
 *     responses:
 *       200:
 *         description: Returns an array of all niveaux
 *       500:
 *         description: Internal server error
 */

// Get all niveaux
router.get("/", getNiveaux);

/**
 * @swagger
 * /niveaux:
 *   post:
 *     summary: Create a new niveau
 *     tags: [Niveaux]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Niveau'
 *     responses:
 *       201:
 *         description: Niveau created successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

// Create a new niveau
router.post("/", createNiveau);

/**
 * @swagger
 * /niveaux/{id}:
 *   get:
 *     summary: Get a single niveau by ID
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the niveau with the specified ID
 *       404:
 *         description: Niveau not found
 *       500:
 *         description: Internal server error
 */

// Get a single niveau by ID
router.get("/:id", getNiveauById);

/**
 * @swagger
 * /niveaux/{id}:
 *   put:
 *     summary: Update a niveau
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Niveau'
 *     responses:
 *       200:
 *         description: Niveau updated successfully
 *       400:
 *         description: Invalid request body or ID
 *       404:
 *         description: Niveau not found
 *       500:
 *         description: Internal server error
 */

// Update a niveau
router.put("/:id", updateNiveau);

/**
 * @swagger
 * /niveaux/{id}:
 *   delete:
 *     summary: Delete a niveau
 *     tags: [Niveaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Niveau deleted successfully
 *       404:
 *         description: Niveau not found
 *       500:
 *         description: Internal server error
 */

// Delete a niveau
router.delete("/:id", deleteNiveau);

export default router;
