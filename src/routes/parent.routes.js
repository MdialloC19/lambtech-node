import express from "express";
import * as parentController from "../controllers/api/parentController.js";

const router = express.Router();

/**
 * Get all parents
 * @route GET /
 * @returns {object} Array of parent objects
 */
router.get("/", parentController.getParents);

/**
 * Get a parent by ID
 * @route GET /:id
 * @param {string} id - The ID of the parent
 * @returns {object} The parent object
 */
router.get("/:id", parentController.getParentById);

/**
 * Create a new parent
 * @route POST /
 * @returns {object} The created parent object
 */
router.post("/", parentController.createParent);

/**
 * Update a parent by ID
 * @route PUT /:id
 * @param {string} id - The ID of the parent
 * @returns {object} The updated parent object
 */
router.put("/:id", parentController.updateParent);

/**
 * Delete a parent by ID
 * @route DELETE /:id
 * @param {string} id - The ID of the parent
 * @returns {object} The deleted parent object
 */
router.delete("/:id", parentController.deleteParent);

export default router;
