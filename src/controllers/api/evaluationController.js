import Evaluation from "../../models/Evaluation.js";

export const getEvaluationsByStudentAndMatiere = (req, res) => {
  const studentId = req.params.studentId;
  const matiereId = req.params.matiereId;

  Evaluation.find({ student: studentId, matiere: matiereId, isDeleted: false })
    .populate("matiere", "intitule code coefficient")
    .populate("student", "name")
    .exec((err, evaluations) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la récupération des évaluations"
          );
      } else {
        res.json(evaluations);
      }
    });
};

export const getEvaluationsByTeacherAndMatiere = (req, res) => {
  const teacherId = req.params.teacherId;
  const matiereId = req.params.matiereId;

  Evaluation.find({ teacher: teacherId, matiere: matiereId, isDeleted: false })
    .populate("matiere", "intitule code coefficient")
    .populate("teacher", "name")
    .exec((err, evaluations) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la récupération des évaluations"
          );
      } else {
        res.json(evaluations);
      }
    });
};

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

export const getEvaluationById = (req, res) => {
  const evaluationId = req.params.id;

  Evaluation.findOne({ _id: evaluationId, isDeleted: false })
    .populate("matiere", "intitule code coefficient")
    .populate("teacher", "name")
    .populate("student", "name")
    .exec((err, evaluation) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la récupération de l'évaluation"
          );
      } else if (!evaluation) {
        res.status(404).send("L'évaluation demandée n'a pas été trouvée");
      } else {
        res.json(evaluation);
      }
    });
};

export const updateEvaluation = (req, res) => {
  const evaluationId = req.params.id;
  const update = req.body;

  Evaluation.findOneAndUpdate(
    { _id: evaluationId, isDeleted: false },
    update,
    { new: true },
    (err, evaluation) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la mise à jour de l'évaluation"
          );
      } else if (!evaluation) {
        res
          .status(404)
          .send("L'évaluation à mettre à jour n'a pas été trouvée");
      } else {
        res.json(evaluation);
      }
    }
  );
};

export const deleteEvaluation = (req, res) => {
  const evaluationId = req.params.id;

  Evaluation.findOneAndUpdate(
    { _id: evaluationId, isDeleted: false },
    { isDeleted: true },
    { new: true },
    (err, deletedEvaluation) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send(
            "Une erreur s'est produite lors de la suppression de l'évaluation"
          );
      } else if (!deletedEvaluation) {
        res.status(404).send("L'évaluation à supprimer n'a pas été trouvée");
      } else {
        res.sendStatus(204);
      }
    }
  );
};