import express from "express";
import matiereController from "../controllers/api/matiereController.js";

const router = express.Router();

// Define routes for matiere controllers
router.get("/", matiereController.getAllMatieres);
router.get("/:id", matiereController.getMatiereById);
router.post("/", matiereController.createMatiere);
router.put("/:id", matiereController.updateMatiere);
router.delete("/:id", matiereController.deleteMatiere);

export default router;
