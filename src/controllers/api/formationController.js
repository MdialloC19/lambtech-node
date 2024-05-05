import FormationService from "../../services/api/formation.service.js";

/**
 * Get all formations.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the formations.
 */
export async function getFormations(req, res) {
  try {
    const formations = await FormationService.getAllFormations(req.query);
    res.json(formations);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Create a new formation.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the newly created formation.
 */
export async function createFormation(req, res) {
  try {
    const newFormation = await FormationService.createFormation(req.body);
    res.status(201).json(newFormation);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Get a formation by its ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the formation.
 */
export async function getFormationById(req, res) {
  const { id } = req.params;
  try {
    const formation = await FormationService.getFormationById(id);
    res.json(formation);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Update a formation by its ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated formation.
 */
export async function updateFormation(req, res) {
  const { id } = req.params;
  try {
    const updatedFormation = await FormationService.updateFormation(
      id,
      req.body
    );
    res.json(updatedFormation);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Delete a formation by its ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the result of the deletion.
 */
export async function deleteFormation(req, res) {
  const { id } = req.params;
  try {
    const result = await FormationService.deleteFormation(id);
    res.json(result);
  } catch (error) {
    if (error.statusCode) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}
