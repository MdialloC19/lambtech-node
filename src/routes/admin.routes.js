import * as adminController from "../controllers/api/adminController.js";
import Router from "express";
const router = Router();

/**
 * Get all admins
 * @route GET /
 * @returns {object} - Returns an array of admin objects
 */
router.get("/", adminController.getAdmins);

/**
 * Create a new admin
 * @route POST /
 * @returns {object} - Returns the created admin object
 */
router.post("/", adminController.createAdmin);

/**
 * Get an admin by ID
 * @route GET /:id
 * @param {string} id - The ID of the admin
 * @returns {object} - Returns the admin object with the specified ID
 */
router.get("/:id", adminController.getAdminById);

/**
 * Update an admin by ID
 * @route PUT /:id
 * @param {string} id - The ID of the admin
 * @returns {object} - Returns the updated admin object
 */
router.put("/:id", adminController.updateAdmin);

/**
 * Delete an admin by ID
 * @route DELETE /:id
 * @param {string} id - The ID of the admin
 * @returns {object} - Returns a success message if the admin is deleted successfully
 */
router.delete("/:id", adminController.deleteAdmin);

export default router;
