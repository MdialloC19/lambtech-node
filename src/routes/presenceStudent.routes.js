import express from "express";
import {
  getPresences,
  createPresence,
  updatePresence,
  deletePresence,
} from "../controllers/api/presenceStudentController.js";

const router = express.Router();

// Route pour récupérer la présence d'un étudiant pour une matière donnée à une date donnée
router.get("/", getPresences);

// Route pour créer une nouvelle entrée de présence pour un étudiant
router.post("", createPresence);

// Route pour mettre à jour une entrée de présence pour un étudiant
router.put("/:id", updatePresence);

// Route pour supprimer une entrée de présence pour un étudiant
router.delete("/:id", deletePresence);

export default router;
