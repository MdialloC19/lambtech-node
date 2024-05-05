import NiveauService from "../../services/api/niveau.service.js";

// JSDoc typedefs
/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Get all niveaux.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getNiveaux(req, res) {
  try {
    const niveaux = await NiveauService.getAllNiveaux(req.query);
    res.json(niveaux);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Create a new niveau.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function createNiveau(req, res) {
  try {
    const newNiveau = await NiveauService.createNiveau(req.body);
    res.status(201).json(newNiveau);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Get a niveau by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getNiveauById(req, res) {
  const { id } = req.params;
  try {
    const niveau = await NiveauService.getNiveauById(id);
    res.json(niveau);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Update a niveau by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function updateNiveau(req, res) {
  const { id } = req.params;
  try {
    const updatedNiveau = await NiveauService.updateNiveau(id, req.body);
    res.json(updatedNiveau);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Delete a niveau by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function deleteNiveau(req, res) {
  const { id } = req.params;
  try {
    const result = await NiveauService.deleteNiveau(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
