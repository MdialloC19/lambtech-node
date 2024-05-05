import Admin from "../../models/Admin.js";
import User from "../../models/User.js";
import { HttpError } from "../../utils/exceptions.js";
import integretyTester from "../../utils/integrety.utils.js";
import AdminService from "./admin.service.js";

export default class UserService {
  /**
   * Validates user data before creating a new user.
   * @param {Object} userData - User data to validate.
   * @returns {Object} - Validated user data.
   * @throws {HttpError} - Throws a custom HTTP error if validation fails.
   */
  static validateUserData(userData) {
    const { username, email, password } = userData;

    // Basic validation checks
    if (!username || typeof username !== "string") {
      throw new HttpError(
        null,
        400,
        "Username is required and must be a string."
      );
    }

    if (!integretyTester.isEmail(email)) {
      throw new HttpError(null, 400, "Invalid email format.");
    }

    if (!password || typeof password !== "string" || password.length < 6) {
      throw new HttpError(
        null,
        400,
        "Password is required and must be at least 6 characters long."
      );
    }

    return userData;
  }

  /**
   * Creates a new user.
   * @param {Object} userData - Data for the new user.
   * @returns {Promise<Object>} - Promise resolved with the created user.
   * @throws {HttpError} - Throws a custom HTTP error if user creation fails.
   */
  static async createUser(userData) {
    try {
      // Validate user data
      const validatedUserData = UserService.validateUserData(userData);

      // Create new user using Mongoose model
      const user = await User.create(validatedUserData);

      return user;
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
   * Updates an existing user by ID.
   * @param {string} userId - ID of the user to update.
   * @param {Object} updatedUserData - Updated data for the user.
   * @returns {Promise<Object>} - Promise resolved with the updated user.
   * @throws {HttpError} - Throws a custom HTTP error if user update fails.
   */
  static async updateUser(userId, updatedUserData) {
    try {
      // Validate updated user data
      const validatedUserData = UserService.validateUserData(updatedUserData);

      // Update user using Mongoose model
      const user = await User.findByIdAndUpdate(userId, validatedUserData, {
        new: true,
      });

      if (!user) {
        throw new HttpError(null, 404, "User not found.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Deletes an existing user by ID.
   * @param {string} userId - ID of the user to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted user.
   * @throws {HttpError} - Throws a custom HTTP error if user deletion fails.
   */
  static async deleteUser(userId) {
    try {
      // Find and delete user using Mongoose model
      const user = await User.findByIdAndUpdate(userId, {
        isDeleted: true,
      });

      if (!user) {
        throw new HttpError(null, 404, "User not found.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Retrieves an existing user by ID.
   * @param {string} userId - ID of the user to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved user.
   * @throws {HttpError} - Throws a custom HTTP error if user retrieval fails.
   */
  static async getUserById(userId) {
    try {
      // Find user by ID using Mongoose model
      const user = await User.findById(userId);

      if (!user) {
        throw new HttpError(error, 404, "User not found.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Retrieves all users.
   * @returns {Promise<Array>} - Promise resolved with an array of all users.
   * @throws {HttpError} - Throws a custom HTTP error if user retrieval fails.
   */
  static async getAllUsers() {
    try {
      // Find all users using Mongoose model
      const users = await User.find();

      if (users.length === 0) {
        throw new HttpError(error, 404, "No users found.");
      }

      return users;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }
}