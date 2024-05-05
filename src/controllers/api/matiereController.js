import Matiere from "../../models/Matiere.js";

/**
 * Crée une nouvelle matière
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const createMatiere = async (req, res) => {
  try {
    const matiere = await Matiere.create(req.body);
    res.status(201).json(matiere);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

/**
 * Récupère toutes les matières
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const getAllMatieres = async (req, res) => {
  try {
    const matieres = await Matiere.find({ isDelete: false });
    res.json(matieres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Récupère une seule matière par son identifiant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
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

/**
 * Met à jour une matière
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
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

/**
 * Supprime une matière en mode soft delete
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
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
