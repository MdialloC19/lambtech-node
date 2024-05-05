import SMSService from "../../services/api/smsService.js";

/**
 * Contrôleur pour la gestion des SMS.
 */
export default class SMSController {
  /**
   * Envoie un SMS.
   * @param {import('express').Request} req - Requête Express.
   * @param {import('express').Response} res - Réponse Express.
   * @returns {Promise<void>} - Une promesse indiquant la fin du traitement.
   */
  static async sendSMS(req, res) {
    try {
      const { content, msisdns } = req.body;
      //   const receivers = msisdns.map((msisdn) => msisdn.id); // Supposons que msisdns est un tableau d'objets avec des identifiants d'utilisateurs

      const success = await SMSService.sendSMSAndSave(content, msisdns);

      if (success) {
        res.json({ success: true, message: "SMS envoyé avec succès" });
      } else {
        res
          .status(500)
          .json({ success: false, message: "Erreur lors de l'envoi du SMS" });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}
