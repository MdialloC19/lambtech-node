import FormationService from "../../services/api/formation.service.js";

export async function getFormations(req, res) {
  try {
    const formations = await FormationService.getAllFormations(req.query);
    res.json(formations);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function createFormation(req, res) {
  try {
    const newFormation = await FormationService.createFormation(req.body);
    res.status(201).json(newFormation);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function getFormationById(req, res) {
  const { id } = req.params;
  try {
    const formation = await FormationService.getFormationById(id);
    res.json(formation);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function updateFormation(req, res) {
  const { id } = req.params;
  try {
    const updatedFormation = await FormationService.updateFormation(
      id,
      req.body
    );
    res.json(updatedFormation);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

export async function deleteFormation(req, res) {
  const { id } = req.params;
  try {
    const result = await FormationService.deleteFormation(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
