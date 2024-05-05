import Evaluation from "../../models/Evaluation.js";
import { HttpError } from "../../utils/exceptions.js";

export default class EvaluationService {
  static async getEvaluationsByStudentAndMatiere(studentId, matiereId) {
    try {
      const evaluations = await Evaluation.find({
        student: studentId,
        matiere: matiereId,
        isDeleted: false,
      })
        .populate("matiere", "name")
        .populate("student", "name");

      return evaluations;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Une erreur s'est produite lors de la récupération des évaluations"
      );
    }
  }

  static async getEvaluationsByTeacherAndMatiere(teacherId, matiereId) {
    try {
      const evaluations = await Evaluation.find({
        teacher: teacherId,
        matiere: matiereId,
        isDeleted: false,
      })
        .populate("matiere", "intitule code coefficient")
        .populate("teacher", "name");

      return evaluations;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Une erreur s'est produite lors de la récupération des évaluations"
      );
    }
  }

  static async createEvaluation(evaluationData) {
    try {
      const newEvaluation = new Evaluation(evaluationData);
      const savedEvaluation = await newEvaluation.save();

      return savedEvaluation;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Une erreur s'est produite lors de la création de l'évaluation"
      );
    }
  }

  static async getEvaluationById(evaluationId) {
    try {
      const evaluation = await Evaluation.findOne({
        _id: evaluationId,
        isDeleted: false,
      })
        .populate("matiere", "intitule code coefficient")
        .populate("teacher", "name")
        .populate("student", "name");

      if (!evaluation) {
        throw new HttpError(
          null,
          404,
          "L'évaluation demandée n'a pas été trouvée"
        );
      }

      return evaluation;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Une erreur s'est produite lors de la récupération de l'évaluation"
      );
    }
  }

  static async updateEvaluation(evaluationId, update) {
    try {
      const updatedEvaluation = await Evaluation.findOneAndUpdate(
        { _id: evaluationId, isDeleted: false },
        update,
        { new: true }
      );

      if (!updatedEvaluation) {
        throw new HttpError(
          null,
          404,
          "L'évaluation à mettre à jour n'a pas été trouvée"
        );
      }

      return updatedEvaluation;
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Une erreur s'est produite lors de la mise à jour de l'évaluation"
      );
    }
  }

  static async deleteEvaluation(evaluationId) {
    try {
      const deletedEvaluation = await Evaluation.findOneAndUpdate(
        { _id: evaluationId, isDeleted: false },
        { isDeleted: true },
        { new: true }
      );

      if (!deletedEvaluation) {
        throw new HttpError(
          null,
          404,
          "L'évaluation à supprimer n'a pas été trouvée"
        );
      }
    } catch (error) {
      throw new HttpError(
        error,
        500,
        "Une erreur s'est produite lors de la suppression de l'évaluation"
      );
    }
  }
}
