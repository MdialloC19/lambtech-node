import FormationService from "../../services/api/formation.service.js";

// JSDoc typedefs
/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Get all formations.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the formations.
 */
export async function getFormations(req, res) {
  try {
    const formations = await FormationService.getAllFormations(req.query);
    res.json(formations);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Create a new formation.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the newly created formation.
 */
export async function createFormation(req, res) {
  try {
    const newFormation = await FormationService.createFormation(req.body);
    res.status(201).json(newFormation);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Get a formation by its ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the formation.
 */
export async function getFormationById(req, res) {
  const { id } = req.params;
  try {
    const formation = await FormationService.getFormationById(id);
    res.json(formation);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Update a formation by its ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
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
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Delete a formation by its ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the result of the deletion.
 */
export async function deleteFormation(req, res) {
  const { id } = req.params;
  try {
    const result = await FormationService.deleteFormation(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
