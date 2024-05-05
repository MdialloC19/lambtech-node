import express from "express";
import * as evaluationController from "../controllers/api/evaluationController.js";

const router = express.Router();

// GET /:studentId/:matiereId
router.get(
  "/:studentId/:matiereId",
  evaluationController.getEvaluationsByStudentAndMatiere
);

// GET /teacher/:teacherId/:matiereId
router.get(
  "/teacher/:teacherId/:matiereId",
  evaluationController.getEvaluationsByTeacherAndMatiere
);

// POST
router.post("/", evaluationController.createEvaluation);

// GET /:id
router.get("/:id", evaluationController.getEvaluationById);

// PUT /:id
router.put("/:id", evaluationController.updateEvaluation);

// DELETE /:id
router.delete("/:id", evaluationController.deleteEvaluation);

export default router;
