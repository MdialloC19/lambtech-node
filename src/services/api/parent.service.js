import Parent from "../../models/Parent.js";
import UserService from "./user.service.js";
import { HttpError } from "../../utils/exceptions.js";

export default class ParentService {
  /**
   * Creates a new parent.
   * @param {Object} parentData - Data for the new parent.
   * @returns {Promise<Object>} - Promise resolved with the created parent.
   * @throws {HttpError} - Throws a custom HTTP error if parent creation fails.
   */
  static async createParent(parentData) {
    try {
      // Create user for the parent
      const user = await UserService.createUser(parentData);

      if (!user) {
        throw new HttpError(null, 404, "User not found.");
      }

      // Create new parent using Mongoose model
      const parent = await Parent.create({
        user: user._id,
      });

      if (!parent) {
        throw new HttpError(null, 400, "Parent not created.");
      }

      return parent;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new HttpError(error, 400, "Email already exists.");
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Updates an existing parent by ID.
   * @param {string} parentId - ID of the parent to update.
   * @param {Object} updatedParentData - Updated data for the parent.
   * @returns {Promise<Object>} - Promise resolved with the updated parent.
   * @throws {HttpError} - Throws a custom HTTP error if parent update fails.
   */
  static async updateParent(parentId, updatedParentData) {
    try {
      // Update parent using Mongoose model
      const parent = await Parent.findById(parentId);
      if (!parent) {
        throw new HttpError(null, 404, "Parent not found.");
      }

      const user = await UserService.updateUser(parent.user, updatedParentData);

      if (!user) {
        throw new HttpError(null, 404, "User not found.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Deletes an existing parent by ID.
   * @param {string} parentId - ID of the parent to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted parent.
   * @throws {HttpError} - Throws a custom HTTP error if parent deletion fails.
   */
  static async deleteParent(parentId) {
    try {
      // Find and delete parent using Mongoose model
      const parent = await Parent.findById(parentId);

      if (!parent) {
        throw new HttpError(null, 404, "Parent not found.");
      }

      await UserService.deleteUser(parent.user);

      return parent;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Retrieves an existing parent by ID.
   * @param {string} parentId - ID of the parent to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved parent.
   * @throws {HttpError} - Throws a custom HTTP error if parent retrieval fails.
   */
  static async getParentById(parentId) {
    try {
      // Find parent by ID using Mongoose model
      const parent = await Parent.findById(parentId).populate(
        "user",
        "-password"
      );

      if (!parent) {
        throw new HttpError(null, 404, "Parent not found.");
      }

      return parent;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Retrieves all parents.
   * @param {Object} pagination - Pagination options.
   * @param {number} pagination.pageNumber - The page number to retrieve.
   * @param {number} pagination.pageCount - The number of items to retrieve per page.
   * @returns {Promise<Array>} - Promise resolved with an array of parents.
   * @throws {HttpError} - Throws a custom HTTP error if parent retrieval fails.
   */
  static async getParents(pagination) {
    try {
      // Find all parents using Mongoose model
      const parents = await Parent.find()
        .populate({
          path: "user",
          select: "-password",
        })
        .skip((pagination.pageNumber - 1) * pagination.pageCount)
        .limit(pagination.pageCount);

      if (parents.length === 0) {
        throw new HttpError(null, 404, "No parents found.");
      }

      return parents;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }
}
