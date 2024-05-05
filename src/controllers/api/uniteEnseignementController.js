import UniteEnseignementService from "../../services/api/uniteEnseignement.service.js";

/**
 * Retrieves all units of teaching.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the JSON response containing all units of teaching.
 */
export async function getUnitesEnseignement(req, res) {
  try {
    const unitesEnseignement =
      await UniteEnseignementService.getAllUnitesEnseignement(req.query);
    res.json(unitesEnseignement);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Creates a new unit of teaching.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the JSON response containing the newly created unit of teaching.
 */
export async function createUniteEnseignement(req, res) {
  try {
    const newUniteEnseignement =
      await UniteEnseignementService.createUniteEnseignement(req.body);
    res.status(201).json(newUniteEnseignement);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Retrieves a unit of teaching by its ID.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the JSON response containing the unit of teaching with the specified ID.
 */
export async function getUniteEnseignementById(req, res) {
  const { id } = req.params;
  try {
    const uniteEnseignement =
      await UniteEnseignementService.getUniteEnseignementById(id);
    res.json(uniteEnseignement);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Updates a unit of teaching.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the JSON response containing the updated unit of teaching.
 */
export async function updateUniteEnseignement(req, res) {
  const { id } = req.params;
  try {
    const updatedUniteEnseignement =
      await UniteEnseignementService.updateUniteEnseignement(id, req.body);
    res.json(updatedUniteEnseignement);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Deletes a unit of teaching.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the JSON response indicating the success of the deletion.
 */
export async function deleteUniteEnseignement(req, res) {
  const { id } = req.params;
  try {
    const result = await UniteEnseignementService.deleteUniteEnseignement(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
