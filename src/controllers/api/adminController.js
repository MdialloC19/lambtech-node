import AdminService from "../../services/api/admin.service.js";
import { DEFAULT_PAGINATION } from "../../utils/constants.js";

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
  const { username, password, email, phone } = req.body;

  const userInfos = {
    username,
    email,
    password,
    phone,
  };

  try {
    await AdminService.createAdmin(userInfos);
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
  const { pageNumber = 0, pageCount = DEFAULT_PAGINATION } = req.query;
  if (isNaN(parseInt(pageNumber)) || isNaN(parseInt(pageCount))) {
    return res
      .status(400)
      .json({ message: "Invalid Page number and count are required" });
  }
  const pagination = {
    pageNumber: parseInt(pageNumber),
    pageCount: parseInt(pageCount),
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
  const { id } = req.params;
  const { username, email, password, phone } = req.body;
  const userData = { username, email, password, phone };
  try {
    const admin = await AdminService.updateAdmin(id, userData);
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
