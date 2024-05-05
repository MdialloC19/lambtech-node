import Formation from "../../models/Formation.js";
import APIFeatures from "../../utils/apiFeatures.js";
import { HttpError } from "../../utils/exceptions.js";

export default class FormationService {
  /**
   * Retrieves all formations based on query parameters.
   * @param {Object} query - Query parameters for filtering, sorting, pagination, etc.
   * @returns {Promise<Array>} - Promise resolved with an array of formations.
   * @throws {HttpError} - Throws a custom HTTP error if formation retrieval fails.
   */
  static async getAllFormations(query) {
    try {
      const features = new APIFeatures(Formation.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const formations = await features.query;
      return formations;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Creates a new formation.
   * @param {Object} formData - Data for the new formation.
   * @returns {Promise<Object>} - Promise resolved with the created formation.
   * @throws {HttpError} - Throws a custom HTTP error if formation creation fails.
   */
  static async createFormation(formData) {
    try {
      const newFormation = await Formation.create(formData);
      return newFormation;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new HttpError(400, error.message);
      } else if (error.name === "MongoError" && error.code === 11000) {
        throw new HttpError(400, "Formation already exists.");
      } else {
        throw new HttpError(500, "Internal server error.");
      }
    }
  }

  /**
   * Retrieves a single formation by ID.
   * @param {string} formationId - ID of the formation to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved formation.
   * @throws {HttpError} - Throws a custom HTTP error if formation retrieval fails.
   */
  static async getFormationById(formationId) {
    try {
      const formation = await Formation.findById(formationId);
      if (!formation) {
        throw new HttpError(404, "Formation not found.");
      }
      return formation;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Updates an existing formation by ID.
   * @param {string} formationId - ID of the formation to update.
   * @param {Object} updatedData - Updated data for the formation.
   * @returns {Promise<Object>} - Promise resolved with the updated formation.
   * @throws {HttpError} - Throws a custom HTTP error if formation update fails.
   */
  static async updateFormation(formationId, updatedData) {
    try {
      const updatedFormation = await Formation.findByIdAndUpdate(
        formationId,
        updatedData,
        { new: true }
      );
      if (!updatedFormation) {
        throw new HttpError(404, "Formation not found.");
      }
      return updatedFormation;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Deletes an existing formation by ID.
   * @param {string} formationId - ID of the formation to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted formation.
   * @throws {HttpError} - Throws a custom HTTP error if formation deletion fails.
   */
  static async deleteFormation(formationId) {
    try {
      const formation = await Formation.findById(formationId);
      if (!formation) {
        throw new HttpError(404, "Formation not found.");
      }
      await formation.remove();
      return { message: "Formation removed" };
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }
}
