import AdminService from "../../services/api/admin.service.js";
import { DEFAULT_PAGINATION } from "../../utils/constants.js";
import { HttpError } from "../../utils/exceptions.js";

// JSDoc typedefs
/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Create a new admin.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the admin is created.
 */
export async function createAdmin(req, res) {
  try {
    await AdminService.createAdmin(req.body);
    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Get all admins.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the admins are retrieved.
 */
export async function getAdmins(req, res) {
  const { page = 1, limit = DEFAULT_PAGINATION } = req.query;
  if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
    return res
      .status(400)
      .json({ message: "Invalid Page number and count are required" });
  }
  const pagination = {
    pageNumber: parseInt(page),
    pageCount: parseInt(limit),
  };
  try {
    const admins = await AdminService.getAdmins(pagination);
    res.status(200).json(admins);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Get an admin by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the admin is retrieved.
 */
export async function getAdminById(req, res) {
  const { id } = req.params;
  try {
    const admin = await AdminService.getAdminById(id);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Update an admin by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the admin is updated.
 */
export async function updateAdmin(req, res) {
  if (req.body.isDeleted) req.body.isDeleted = undefined;
  try {
    const admin = await AdminService.updateAdmin(id, req.body);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Delete an admin by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the admin is deleted.
 */
export async function deleteAdmin(req, res) {
  const { id } = req.params;
  try {
    const admin = await AdminService.deleteAdmin(id);
    res.status(200).json(admin);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
