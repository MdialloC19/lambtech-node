import PointageService from "../../services/api/pointage.service.js";
import { HttpError } from "../../utils/exceptions.js";

/**
 * Get all pointage entries.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getPointages(req, res) {
  try {
    const pointages = await PointageService.getAllPointages();
    res.status(200).json(pointages);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * Create a new pointage entry.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function createPointage(req, res) {
  const { date, user, matiere } = req.body;
  try {
    // Validate pointage data
    PointageService.validatePointageData({ date, user, matiere });

    // Create pointage
    const pointage = await PointageService.createPointage({
      date,
      user,
      matiere,
    });
    res.status(201).json(pointage);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Get a pointage entry by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getPointageById(req, res) {
  const { id } = req.params;
  try {
    const pointage = await PointageService.getPointageById(id);
    res.status(200).json(pointage);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Update a pointage entry by ID.
 * @param {import('express').Request}
 * @param {import('express').Response}
 * @returns {Promise<void>}
 */
export async function updatePointage(req, res) {
  const { id } = req.params;
  const { date, user, matiere } = req.body;
  try {
    // Validate pointage data
    PointageService.validatePointageData({ date, user, matiere });

    // Update pointage
    const pointage = await PointageService.updatePointage(id, {
      date,
      user,
      matiere,
    });
    res.status(200).json(pointage);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Delete a pointage entry by ID.
 * @param {import('express').Request}
 * @param {import('express').Response}
 * @returns {Promise<void>}
 */
export async function deletePointage(req, res) {
  const { id } = req.params;
  try {
    await PointageService.deletePointage(id);
    res.status(204).end();
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
