import Niveau from "../../models/Niveau.js";
import APIFeatures from "../../utils/apiFeatures.js";
import { HttpError } from "../../utils/exceptions.js";

export default class NiveauService {
  /**
   * Retrieves all niveaux based on query parameters.
   * @param {Object} query - Query parameters for filtering, sorting, pagination, etc.
   * @returns {Promise<Array>} - Promise resolved with an array of niveaux.
   * @throws {HttpError} - Throws a custom HTTP error if niveau retrieval fails.
   */
  static async getAllNiveaux(query) {
    try {
      const features = new APIFeatures(Niveau.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const niveaux = await features.query;

      if (!niveaux) {
        throw new HttpError(null, 404, "Niveaux not found.");
      }

      return niveaux;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }

  /**
   * Creates a new niveau.
   * @param {Object} niveauData - Data for the new niveau.
   * @returns {Promise<Object>} - Promise resolved with the created niveau.
   * @throws {HttpError} - Throws a custom HTTP error if niveau creation fails.
   */
  static async createNiveau(niveauData) {
    try {
      const newNiveau = await Niveau.create(niveauData);

      if (!newNiveau) {
        throw new HttpError(null, 400, "Niveau not created.");
      }

      return newNiveau;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new HttpError(error, 400, "Niveau already exists.");
      } else {
        throw new HttpError(error, 500, "Internal server error.");
      }
    }
  }

  /**
   * Retrieves a single niveau by ID.
   * @param {string} niveauId - ID of the niveau to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved niveau.
   * @throws {HttpError} - Throws a custom HTTP error if niveau retrieval fails.
   */
  static async getNiveauById(niveauId) {
    try {
      const niveau = await Niveau.findById(niveauId);
      if (!niveau) {
        throw new HttpError(null, 404, "Niveau not found.");
      }
      return niveau;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }

  /**
   * Updates an existing niveau by ID.
   * @param {string} niveauId - ID of the niveau to update.
   * @param {Object} updatedData - Updated data for the niveau.
   * @returns {Promise<Object>} - Promise resolved with the updated niveau.
   * @throws {HttpError} - Throws a custom HTTP error if niveau update fails.
   */
  static async updateNiveau(niveauId, updatedData) {
    try {
      const updatedNiveau = await Niveau.findByIdAndUpdate(
        niveauId,
        updatedData,
        { new: true }
      );
      if (!updatedNiveau) {
        throw new HttpError(null, 404, "Niveau not found.");
      }
      return updatedNiveau;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }

  /**
   * Deletes an existing niveau by ID.
   * @param {string} niveauId - ID of the niveau to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted niveau.
   * @throws {HttpError} - Throws a custom HTTP error if niveau deletion fails.
   */
  static async deleteNiveau(niveauId) {
    try {
      const niveau = await Niveau.findById(niveauId);
      if (!niveau) {
        throw new HttpError(null, 404, "Niveau not found.");
      }
      await niveau.remove();
      return { message: "Niveau removed" };
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }
}
