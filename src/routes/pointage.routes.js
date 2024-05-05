import express from "express";
import * as pointageController from "../controllers/api/pointageController.js";

const router = express.Router();

router.get("/", pointageController.getPointages);
router.get("/:id", pointageController.getPointageById);
router.post("/", pointageController.createPointage);
router.put("/:id", pointageController.updatePointage);
router.delete("/:id", pointageController.deletePointage);

export default router;
