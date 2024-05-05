import express from "express";
const router = express.Router();

import {
  getFormations,
  createFormation,
  getFormationById,
  updateFormation,
  deleteFormation,
} from "../controllers/api/formationController.js";

/**
 * @route   GET /api/formations
 * @desc    Get all formations
 * @access  Public
 */
router.get("/", getFormations);

/**
 * @route   POST /api/formations
 * @desc    Create a new formation
 * @access  Public
 */
router.post("/", createFormation);

/**
 * @route   GET /api/formations/:id
 * @desc    Get a single formation by ID
 * @access  Public
 */
router.get("/:id", getFormationById);

/**
 * @route   PUT /api/formations/:id
 * @desc    Update a formation
 * @access  Public
 */
router.put("/:id", updateFormation);

/**
 * @route   DELETE /api/formations/:id
 * @desc    Delete a formation
 * @access  Public
 */
router.delete("/:id", deleteFormation);

export default router;
