import Matiere from "../../models/Matiere.js";

// Créer une matière
const createMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.create(req.body);
    res.status(201).json(matiere);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Obtenir toutes les matières
const getAllMatieres = async (req, res) => {
  try {
    const matieres = await Matiere.find({ isDelete: false });
    res.json(matieres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir une seule matière par son identifiant
const getMatiereById = async (req, res) => {
  try {
    const matiere = await Matiere.findOne({
      _id: req.params.id,
      isDelete: false,
    });
    if (!matiere) {
      return res.status(404).json({ error: "Matiere not found" });
    }
    res.json(matiere);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour une matière
const updateMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.findOneAndUpdate(
      { _id: req.params.id, isDelete: false },
      req.body,
      { new: true }
    );
    if (!matiere) {
      return res.status(404).json({ error: "Matiere not found" });
    }
    res.json(matiere);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Supprimer une matière en mode soft delete
const deleteMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.findOneAndUpdate(
      { _id: req.params.id, isDelete: false },
      { isDelete: true },
      { new: true }
    );
    if (!matiere) {
      return res.status(404).json({ error: "Matiere not found" });
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default {
  createMatiere,
  getAllMatieres,
  getMatiereById,
  updateMatiere,
  deleteMatiere,
};
