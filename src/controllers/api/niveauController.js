import NiveauService from "../../services/api/niveau.service.js";
import { HttpError } from "../../utils/exceptions.js";

/**
 * Get all niveaux.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getNiveaux(req, res) {
  try {
    const niveaux = await NiveauService.getAllNiveaux(req.query);
    res.json(niveaux);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Create a new niveau.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function createNiveau(req, res) {
  try {
    const newNiveau = await NiveauService.createNiveau(req.body);
    res.status(201).json(newNiveau);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Get a niveau by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getNiveauById(req, res) {
  const { id } = req.params;
  try {
    const niveau = await NiveauService.getNiveauById(id);
    res.json(niveau);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Update a niveau by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function updateNiveau(req, res) {
  const { id } = req.params;
  try {
    const updatedNiveau = await NiveauService.updateNiveau(id, req.body);
    res.json(updatedNiveau);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Delete a niveau by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function deleteNiveau(req, res) {
  const { id } = req.params;
  try {
    const result = await NiveauService.deleteNiveau(id);
    res.json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}
