import PresenceTeacher from "../../models/PresenceTeacher.js";
import APIFeatures from "../../utils/apiFeatures.js";

/**
 * Récupère la présence d'un enseignant pour une matière donnée à une date donnée
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const getPresences = async (req, res) => {
  try {
    const features = new APIFeatures(PresenceTeacher.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    let presences = await features.query;
    res.json(presences);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la récupération de la présence de l'enseignant"
      );
  }
};

/**
 * Crée une nouvelle entrée de présence pour un enseignant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const createPresence = async (req, res) => {
  try {
    const { teacher, matiere, presence, date } = req.body;

    const newPresence = new PresenceTeacher({
      teacher,
      matiere,
      presence,
      date,
    });

    const savedPresence = await newPresence.save();

    res.status(201).json(savedPresence);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la création de l'entrée de présence"
      );
  }
};

/**
 * Met à jour une entrée de présence pour un enseignant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const updatePresence = async (req, res) => {
  try {
    const presenceId = req.params.id;
    const update = req.body;

    const updatedPresence = await PresenceTeacher.findOneAndUpdate(
      { _id: presenceId },
      update,
      { new: true }
    );

    if (!updatedPresence) {
      res
        .status(404)
        .send(
          "L'entrée de présence à mettre à jour pour l'enseignant n'a pas été trouvée"
        );
    } else {
      res.json(updatedPresence);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la mise à jour de l'entrée de présence"
      );
  }
};

/**
 * Supprime une entrée de présence pour un enseignant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const deletePresence = async (req, res) => {
  try {
    const presenceId = req.params.id;

    const deletedPresence = await PresenceTeacher.findOneAndUpdate(
      { _id: presenceId, isDeleted: false },
      { new: true }
    );

    if (!deletedPresence) {
      res
        .status(404)
        .send(
          "L'entrée de présence à supprimer pour l'enseignant n'a pas été trouvée"
        );
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la suppression de l'entrée de présence"
      );
  }
};
