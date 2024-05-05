import Evaluation from "../../models/Evaluation.js";

/**
 * Récupère les évaluations d'un étudiant pour une matière donnée
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const getEvaluationsByStudentAndMatiere = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const matiereId = req.params.matiereId;

    const evaluations = await Evaluation.find({
      student: studentId,
      matiere: matiereId,
      isDeleted: false,
    })
      .populate("matiere", "name")
      .populate("student", "name");

    res.json(evaluations);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la récupération des évaluations"
      );
  }
};

/**
 * Récupère les évaluations d'un enseignant pour une matière donnée
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const getEvaluationsByTeacherAndMatiere = async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const matiereId = req.params.matiereId;

    const evaluations = await Evaluation.find({
      teacher: teacherId,
      matiere: matiereId,
      isDeleted: false,
    })
      .populate("matiere", "intitule code coefficient")
      .populate("teacher", "name");

    res.json(evaluations);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la récupération des évaluations"
      );
  }
};

/**
 * Crée une nouvelle évaluation
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const createEvaluation = async (req, res) => {
  try {
    const { teacher, matiere, student, noteTP, noteCC, noteDS } = req.body;

    const newEvaluation = new Evaluation({
      teacher,
      matiere,
      student,
      noteTP,
      noteCC,
      noteDS,
    });

    const savedEvaluation = await newEvaluation.save();

    res.status(201).json(savedEvaluation);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Une erreur s'est produite lors de la création de l'évaluation");
  }
};

/**
 * Récupère une évaluation par son ID
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const getEvaluationById = async (req, res) => {
  try {
    const evaluationId = req.params.id;

    const evaluation = await Evaluation.findOne({
      _id: evaluationId,
      isDeleted: false,
    })
      .populate("matiere", "intitule code coefficient")
      .populate("teacher", "name")
      .populate("student", "name");

    if (!evaluation) {
      res.status(404).send("L'évaluation demandée n'a pas été trouvée");
    } else {
      res.json(evaluation);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la récupération de l'évaluation"
      );
  }
};

/**
 * Met à jour une évaluation
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const updateEvaluation = async (req, res) => {
  try {
    const evaluationId = req.params.id;
    const update = req.body;

    const updatedEvaluation = await Evaluation.findOneAndUpdate(
      { _id: evaluationId, isDeleted: false },
      update,
      { new: true }
    );

    if (!updatedEvaluation) {
      res.status(404).send("L'évaluation à mettre à jour n'a pas été trouvée");
    } else {
      res.json(updatedEvaluation);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Une erreur s'est produite lors de la mise à jour de l'évaluation");
  }
};

/**
 * Supprime une évaluation
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const deleteEvaluation = async (req, res) => {
  try {
    const evaluationId = req.params.id;

    const deletedEvaluation = await Evaluation.findOneAndUpdate(
      { _id: evaluationId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedEvaluation) {
      res.status(404).send("L'évaluation à supprimer n'a pas été trouvée");
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("Une erreur s'est produite lors de la suppression de l'évaluation");
  }
};
