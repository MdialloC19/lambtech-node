import express from "express";
const router = express.Router();

import {
  getUnitesEnseignement,
  createUniteEnseignement,
  getUniteEnseignementById,
  updateUniteEnseignement,
  deleteUniteEnseignement,
} from "../controllers/api/uniteEnseignementController.js";

/**
 * @route   GET /api/unitesEnseignement
 * @desc    Get all unités d'enseignement
 * @access  Public
 */
router.get("/", getUnitesEnseignement);

/**
 * @route   POST /api/unitesEnseignement
 * @desc    Create a new unité d'enseignement
 * @access  Public
 */
router.post("/", createUniteEnseignement);

/**
 * @route   GET /api/unitesEnseignement/:id
 * @desc    Get a single unité d'enseignement by ID
 * @access  Public
 */
router.get("/:id", getUniteEnseignementById);

/**
 * @route   PUT /api/unitesEnseignement/:id
 * @desc    Update an unité d'enseignement
 * @access  Public
 */
router.put("/:id", updateUniteEnseignement);

/**
 * @route   DELETE /api/unitesEnseignement/:id
 * @desc    Delete an unité d'enseignement
 * @access  Public
 */
router.delete("/:id", deleteUniteEnseignement);

export default router;
