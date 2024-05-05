import express from "express";
import SMSController from "../controllers/api/smsController.js";
import { body } from "express-validator";

const router = express.Router();

// POST /api/send-sms
router.post(
  "/send-sms",
  [
    // Validation des champs requis
    body("content").notEmpty().withMessage("Le contenu du SMS est requis"),
    body("msisdns")
      .isArray({ min: 1 })
      .withMessage("Au moins un numéro de téléphone est requis"),
  ],
  SMSController.sendSMS
);

export default router;
