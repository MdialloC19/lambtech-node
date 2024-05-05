import ParentService from "../../services/api/parent.service.js";
import { HttpError } from "../../utils/exceptions.js";

/**
 * Crée un nouveau parent.
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express.
 */
export async function createParent(req, res) {
  try {
    const parent = await ParentService.createParent(req.body);
    res.status(201).json(parent);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Met à jour un parent existant.
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express.
 */
export async function updateParent(req, res) {
  const { parentId } = req.params;
  try {
    const parent = await ParentService.updateParent(parentId, req.body);
    res.status(200).json(parent);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Supprime un parent existant.
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express.
 */
export async function deleteParent(req, res) {
  const { parentId } = req.params;
  try {
    const parent = await ParentService.deleteParent(parentId);
    res.status(200).json(parent);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Récupère un parent par son ID.
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express.
 */
export async function getParentById(req, res) {
  const { parentId } = req.params;
  try {
    const parent = await ParentService.getParentById(parentId);
    res.status(200).json(parent);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Récupère tous les parents avec pagination.
 * @param {import('express').Request} req - Requête Express.
 * @param {import('express').Response} res - Réponse Express.
 */
export async function getParents(req, res) {
  const { pageNumber, pageCount } = req.query;
  const pagination = {
    pageNumber: parseInt(pageNumber) || 1,
    pageCount: parseInt(pageCount) || 10,
  };

  try {
    const parents = await ParentService.getParents(pagination);
    res.status(200).json(parents);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
