import express from "express";
import {
  getPresences,
  createPresence,
  updatePresence,
  deletePresence,
} from "../controllers/api/presenceTeacherController.js";

const router = express.Router();

// Route pour récupérer la présence d'un enseignant pour une matière donnée à une date donnée
router.get("/presences", getPresences);

// Route pour créer une nouvelle entrée de présence pour un enseignant
router.post("/presences", createPresence);

// Route pour mettre à jour une entrée de présence pour un enseignant
router.put("/presences/:id", updatePresence);

// Route pour supprimer une entrée de présence pour un enseignant
router.delete("/presences/:id", deletePresence);

export default router;
