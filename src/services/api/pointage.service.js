import Pointage from "../../models/Pointage.js";
import { HttpError } from "../../utils/exceptions.js";

export default class PointageService {
  /**
   * Validates pointage data.
   * @param {Object} pointageData - Pointage data to validate.
   * @throws {HttpError} - Throws a custom HTTP error if validation fails.
   */
  static validatePointageData(pointageData) {
    const { date, user, matiere } = pointageData;
    if (!date || !user || !matiere) {
      throw new HttpError(null, 400, "Date, user, and matiere are required.");
    }
    if (!(date instanceof Date)) {
      throw new HttpError(null, 400, "Date must be a valid Date object.");
    }
    if (typeof user !== "string" || !mongoose.Types.ObjectId.isValid(user)) {
      throw new HttpError(null, 400, "Invalid user ID.");
    }
    if (
      typeof matiere !== "string" ||
      !mongoose.Types.ObjectId.isValid(matiere)
    ) {
      throw new HttpError(null, 400, "Invalid matiere ID.");
    }
  }

  /**
   * Creates a new pointage entry.
   * @param {Object} pointageData - Data for the new pointage entry.
   * @returns {Promise<Object>} - Promise resolved with the created pointage.
   * @throws {HttpError} - Throws a custom HTTP error if pointage creation fails.
   */
  static async createPointage(pointageData) {
    try {
      PointageService.validatePointageData(pointageData);
      const pointage = await Pointage.create(pointageData);
      return pointage;
    } catch (error) {
      if (error instanceof HttpError) throw error;
      if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error.");
      }
    }
  }

  /**
   * Retrieves a pointage entry by ID.
   * @param {string} pointageId - ID of the pointage entry to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved pointage.
   * @throws {HttpError} - Throws a custom HTTP error if pointage retrieval fails.
   */
  static async getPointageById(pointageId) {
    try {
      const pointage = await Pointage.findById(pointageId);
      if (!pointage) {
        throw new HttpError(null, 404, "Pointage not found.");
      }
      return pointage;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }

  /**
   * Retrieves all pointage entries.
   * @returns {Promise<Array>} - Promise resolved with an array of pointage entries.
   * @throws {HttpError} - Throws a custom HTTP error if pointage retrieval fails.
   *
   */
  static async getAllPointages() {
    try {
      const pointages = await Pointage.find();
      return pointages;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }

  /**
   * Updates a pointage entry.
   * @param {string} pointageId - ID of the pointage entry to update.
   * @param {Object} pointageData - Data to update the pointage entry with.
   * @returns {Promise<Object>} - Promise resolved with the updated pointage.
   * @throws {HttpError} - Throws a custom HTTP error if pointage update fails.
   */

  static async updatePointage(pointageId, pointageData) {
    try {
      const pointage = await Pointage.findByIdAndUpdate(
        pointageId,
        pointageData,
        { new: true }
      );
      if (!pointage) {
        throw new HttpError(null, 404, "Pointage not found.");
      }
      return pointage;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error.");
      }
    }
  }
  /**
   * Deletes a pointage entry.
   * @param {string} pointageId - ID of the pointage entry to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted pointage.
   */

  static async deletePointage(pointageId) {
    try {
      const pointage = await Pointage.findByIdAndUpdate(
        pointageId,
        { $set: { isDeleted: true, deletedAt: new Date() } },
        { new: true }
      );
      if (!pointage) {
        throw new HttpError(null, 404, "Pointage not found.");
      }
      return pointage;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }
}
