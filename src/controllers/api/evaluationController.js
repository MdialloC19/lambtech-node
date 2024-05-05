import Evaluation from "../../models/Evaluation.js";
import EvaluationService from "../../services/api/evaluation.service.js";
import { HttpError } from "../../utils/exceptions.js";

export async function getEvaluationsByStudentAndMatiere(req, res) {
  const { studentId, matiereId } = req.params;
  try {
    const evaluations =
      await EvaluationService.getEvaluationsByStudentAndMatiere(
        studentId,
        matiereId
      );
    res.json(evaluations);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}

export async function getEvaluationsByTeacherAndMatiere(req, res) {
  const { teacherId, matiereId } = req.params;
  try {
    const evaluations =
      await EvaluationService.getEvaluationsByTeacherAndMatiere(
        teacherId,
        matiereId
      );
    res.json(evaluations);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}

export async function createEvaluation(req, res) {
  const evaluationData = req.body;
  try {
    const savedEvaluation = await EvaluationService.createEvaluation(
      evaluationData
    );
    res.status(201).json(savedEvaluation);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}

export async function getEvaluationById(req, res) {
  const { id } = req.params;
  try {
    const evaluation = await EvaluationService.getEvaluationById(id);
    res.json(evaluation);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}

export async function updateEvaluation(req, res) {
  const { id } = req.params;
  const update = req.body;
  try {
    const updatedEvaluation = await EvaluationService.updateEvaluation(
      id,
      update
    );
    res.json(updatedEvaluation);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}

export async function deleteEvaluation(req, res) {
  const { id } = req.params;
  try {
    await EvaluationService.deleteEvaluation(id);
    res.sendStatus(204);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).send(error.message);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}
