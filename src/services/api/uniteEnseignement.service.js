import UniteEnseignement from "../../models/UniteEnseignement.js";
import { HttpError } from "../../utils/exceptions.js";
import APIFeatures from "../../utils/apiFeatures.js";

export default class UniteEnseignementService {
  /**
   * Retrieves all unités d'enseignement based on query parameters.
   * @param {Object} query - Query parameters for filtering, sorting, pagination, etc.
   * @returns {Promise<Array>} - Promise resolved with an array of unités d'enseignement.
   * @throws {HttpError} - Throws a custom HTTP error if unité d'enseignement retrieval fails.
   */
  static async getAllUnitesEnseignement(query) {
    try {
      const features = new APIFeatures(UniteEnseignement.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const unitesEnseignement = await features.query;
      return unitesEnseignement;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Creates a new unité d'enseignement.
   * @param {Object} uniteEnseignementData - Data for the new unité d'enseignement.
   * @returns {Promise<Object>} - Promise resolved with the created unité d'enseignement.
   * @throws {HttpError} - Throws a custom HTTP error if unité d'enseignement creation fails.
   */
  static async createUniteEnseignement(uniteEnseignementData) {
    try {
      const newUniteEnseignement = await UniteEnseignement.create(
        uniteEnseignementData
      );
      return newUniteEnseignement;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Retrieves a single unité d'enseignement by ID.
   * @param {string} uniteEnseignementId - ID of the unité d'enseignement to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved unité d'enseignement.
   * @throws {HttpError} - Throws a custom HTTP error if unité d'enseignement retrieval fails.
   */
  static async getUniteEnseignementById(uniteEnseignementId) {
    try {
      const uniteEnseignement = await UniteEnseignement.findById(
        uniteEnseignementId
      );
      if (!uniteEnseignement) {
        throw new HttpError(404, "Unité d'enseignement not found.");
      }
      return uniteEnseignement;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Updates an existing unité d'enseignement by ID.
   * @param {string} uniteEnseignementId - ID of the unité d'enseignement to update.
   * @param {Object} updatedData - Updated data for the unité d'enseignement.
   * @returns {Promise<Object>} - Promise resolved with the updated unité d'enseignement.
   * @throws {HttpError} - Throws a custom HTTP error if unité d'enseignement update fails.
   */
  static async updateUniteEnseignement(uniteEnseignementId, updatedData) {
    try {
      const updatedUniteEnseignement =
        await UniteEnseignement.findByIdAndUpdate(
          uniteEnseignementId,
          updatedData,
          { new: true }
        );
      if (!updatedUniteEnseignement) {
        throw new HttpError(404, "Unité d'enseignement not found.");
      }
      return updatedUniteEnseignement;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Deletes an existing unité d'enseignement by ID.
   * @param {string} uniteEnseignementId - ID of the unité d'enseignement to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted unité d'enseignement.
   * @throws {HttpError} - Throws a custom HTTP error if unité d'enseignement deletion fails.
   */
  static async deleteUniteEnseignement(uniteEnseignementId) {
    try {
      const uniteEnseignement = await UniteEnseignement.findById(
        uniteEnseignementId
      );
      if (!uniteEnseignement) {
        throw new HttpError(404, "Unité d'enseignement not found.");
      }
      uniteEnseignement.isDeleted = true;
      await uniteEnseignement.save();
      return { message: "Unité d'enseignement removed" };
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }
}
