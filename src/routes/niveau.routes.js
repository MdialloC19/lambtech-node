import express from "express";
const router = express.Router();

import {
  getNiveaux,
  createNiveau,
  getNiveauById,
  updateNiveau,
  deleteNiveau,
} from "../controllers/api/niveauController.js";

// Get all niveaux
router.get("/", getNiveaux);

// Create a new niveau
router.post("/", createNiveau);

// Get a single niveau by ID
router.get("/:id", getNiveauById);

// Update a niveau
router.put("/:id", updateNiveau);

// Delete a niveau
router.delete("/:id", deleteNiveau);

export default router;
