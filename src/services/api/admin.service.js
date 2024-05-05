import Admin from "../../models/Admin.js";
import { HttpError } from "../../utils/exceptions.js";
import UserService from "./user.service.js";

export default class AdminService {
  /**
   * Creates a new admin.
   * @param {Object} adminData - Data for the new admin.
   * @returns {Promise<Object>} - Promise resolved with the created admin.
   * @throws {HttpError} - Throws a custom HTTP error if admin creation fails.
   */
  static async createAdmin(adminData) {
    try {
      // create user
      const user = await UserService.createUser(adminData);

      // Create new admin using Mongoose model
      const admin = await Admin.create({
        user: user._id,
      });

      return admin;
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
   * Updates an existing admin by ID.
   * @param {string} adminId - ID of the admin to update.
   * @param {Object} updatedAdminData - Updated data for the admin.
   * @returns {Promise<Object>} - Promise resolved with the updated admin.
   * @throws {HttpError} - Throws a custom HTTP error if admin update fails.
   */
  static async updateAdmin(adminId, updatedUserData) {
    try {
      // Update admin using Mongoose model
      const admin = await Admin.findById(adminId);
      if (!admin) {
        console.log("throw");
        throw new HttpError(null, 404, "Admin not found.");
      }

      const user = UserService.updateUser(admin.user, updatedUserData);

      if (!user) {
        throw new HttpError(null, 404, "user not found.");
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
   * Deletes an existing admin by ID.
   * @param {string} adminId - ID of the admin to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted admin.
   * @throws {HttpError} - Throws a custom HTTP error if admin deletion fails.
   */
  static async deleteAdmin(adminId) {
    try {
      // Find and delete admin using Mongoose model
      const admin = await Admin.findById(adminId);

      if (!admin) {
        throw new HttpError(null, 404, "Admin not found.");
      }
      await UserService.deleteUser(admin.user);

      return admin;
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
   * Retrieves an existing admin by ID.
   * @param {string} adminId - ID of the admin to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved admin.
   * @throws {HttpError} - Throws a custom HTTP error if admin retrieval fails.
   */
  static async getAdminById(adminId) {
    try {
      // Find admin by ID using Mongoose model
      const admin = await Admin.findById(adminId).populate("user", "-password");

      if (!admin) {
        throw new HttpError(null, 404, "Admin not found.");
      }

      return admin;
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
   * Retrieves all admins.
   * @param {Object} pagination - Pagination options.
   * @param {number} pagination.pageNumber - The page number to retrieve.
   * @param {number} pagination.pageCount - The number of items to retrieve per page.
   * @returns {Promise<Array>} - Promise resolved with an array of admins.
   * @throws {HttpError} - Throws a custom HTTP error if admin retrieval fails.
   */
  static async getAdmins(pagination) {
    try {
      // Find all admins using Mongoose model
      const admins = await Admin.find()
        .populate({
          path: "user",
          select: "-password",
        })
        .skip((pagination.pageNumber - 1) * pagination.pageCount)
        .limit(pagination.pageCount);

      if (admins.length === 0) {
        throw new HttpError(error, 404, "No admins found.");
      }

      return admins;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }
}
