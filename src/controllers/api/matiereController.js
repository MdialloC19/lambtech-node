import MatiereService from "../../services/api/matiere.service.js";
import { HttpError } from "../../utils/exceptions.js";

/**
 * Create a new matiere.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the newly created matiere.
 */
export async function createMatiere(req, res) {
  try {
    const matiere = await MatiereService.createMatiere(req.body);
    res.status(201).json(matiere);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

/**
 * Get all matieres.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of matieres.
 */
export async function getAllMatieres(req, res) {
  try {
    const matieres = await MatiereService.getAllMatieres();
    res.json(matieres);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

/**
 * Get a matiere by its ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the matiere.
 */
export async function getMatiereById(req, res) {
  const { id } = req.params;
  try {
    const matiere = await MatiereService.getMatiereById(id);
    res.json(matiere);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

/**
 * Update a matiere by its ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the updated matiere.
 */
export async function updateMatiere(req, res) {
  const { id } = req.params;
  try {
    const updatedMatiere = await MatiereService.updateMatiere(id, req.body);
    res.json(updatedMatiere);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

/**
 * Delete a matiere by its ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the result of the deletion.
 */
export async function deleteMatiere(req, res) {
  const { id } = req.params;
  try {
    await MatiereService.deleteMatiere(id);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
