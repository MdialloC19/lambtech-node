import MatiereService from "../../services/api/matiere.service.js";

export async function createMatiere(req, res) {
  try {
    const matiere = await MatiereService.createMatiere(req.body);
    res.status(201).json(matiere);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export async function getAllMatieres(req, res) {
  try {
    const matieres = await MatiereService.getAllMatieres();
    res.json(matieres);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export async function getMatiereById(req, res) {
  const { id } = req.params;
  try {
    const matiere = await MatiereService.getMatiereById(id);
    res.json(matiere);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export async function updateMatiere(req, res) {
  const { id } = req.params;
  try {
    const updatedMatiere = await MatiereService.updateMatiere(id, req.body);
    res.json(updatedMatiere);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}

export async function deleteMatiere(req, res) {
  const { id } = req.params;
  try {
    await MatiereService.deleteMatiere(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
}
