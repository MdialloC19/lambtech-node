import Matiere from "../../models/Matiere.js";
import { HttpError } from "../../utils/exceptions.js";

export default class MatiereService {
  /**
   * Crée une nouvelle matière.
   * @param {Object} matiereData - Données de la nouvelle matière.
   * @returns {Promise<Object>} - Promesse résolue avec la matière créée.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la création de la matière échoue.
   */
  static async createMatiere(matiereData) {
    try {
      const matiere = await Matiere.create(matiereData);
      return matiere;
    } catch (error) {
      throw new HttpError(error, 400, error.message);
    }
  }

  /**
   * Récupère toutes les matières non supprimées.
   * @returns {Promise<Array>} - Promesse résolue avec un tableau de matières.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la récupération des matières échoue.
   */
  static async getAllMatieres() {
    try {
      const matieres = await Matiere.find({ isDelete: false });
      return matieres;
    } catch (error) {
      throw new HttpError(error, 500, error.message);
    }
  }

  /**
   * Récupère une seule matière par son identifiant.
   * @param {string} matiereId - Identifiant de la matière à récupérer.
   * @returns {Promise<Object>} - Promesse résolue avec la matière récupérée.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la récupération de la matière échoue.
   */
  static async getMatiereById(matiereId) {
    try {
      const matiere = await Matiere.findOne({
        _id: matiereId,
        isDelete: false,
      });
      if (!matiere) {
        throw new HttpError(null, 404, "Matiere not found");
      }
      return matiere;
    } catch (error) {
      throw new HttpError(error, 500, error.message);
    }
  }

  /**
   * Met à jour une matière existante.
   * @param {string} matiereId - Identifiant de la matière à mettre à jour.
   * @param {Object} updatedData - Données mises à jour de la matière.
   * @returns {Promise<Object>} - Promesse résolue avec la matière mise à jour.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la mise à jour de la matière échoue.
   */
  static async updateMatiere(matiereId, updatedData) {
    try {
      const matiere = await Matiere.findOneAndUpdate(
        { _id: matiereId, isDelete: false },
        updatedData,
        { new: true }
      );
      if (!matiere) {
        throw new HttpError(null, 404, "Matiere not found");
      }
      return matiere;
    } catch (error) {
      throw new HttpError(error, 400, error.message);
    }
  }

  /**
   * Supprime une matière en mode "soft delete".
   * @param {string} matiereId - Identifiant de la matière à supprimer.
   * @returns {Promise<void>} - Promesse indiquant la suppression de la matière.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la suppression de la matière échoue.
   */
  static async deleteMatiere(matiereId) {
    try {
      const matiere = await Matiere.findOneAndUpdate(
        { _id: matiereId, isDelete: false },
        { isDelete: true },
        { new: true }
      );
      if (!matiere) {
        throw new HttpError(null, 404, "Matiere not found");
      }
      // Statut 204 : No Content
      return;
    } catch (error) {
      throw new HttpError(error, 500, error.message);
    }
  }
}
