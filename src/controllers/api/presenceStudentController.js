import PresenceStudent from "../../models/PresenceStudent.js";
import APIFeatures from "../../utils/apiFeatures.js";

/**
 * Récupère la présence d'un étudiant pour une matière donnée à une date donnée
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const getPresences = async (req, res) => {
  try {
    const features = new APIFeatures(PresenceStudent.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    let presenceStudents = await features.query;
    res.json(presenceStudents);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send(
        "Une erreur s'est produite lors de la récupération de la présence de l'étudiant"
      );
  }
};

/**
 * Crée une nouvelle entrée de présence pour un étudiant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const createPresence = async (req, res) => {
  try {
    const { student, matiere, presence } = req.body;

    const newPresence = new PresenceStudent({
      student,
      matiere,
      presence,
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
 * Met à jour une entrée de présence pour un étudiant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const updatePresence = async (req, res) => {
  try {
    const presenceId = req.params.id;
    const update = req.body;

    const updatedPresence = await PresenceStudent.findOneAndUpdate(
      { _id: presenceId, isDeleted: false },
      update,
      { new: true }
    );

    if (!updatedPresence) {
      res
        .status(404)
        .send(
          "L'entrée de présence à mettre à jour pour l'étudiant n'a pas été trouvée"
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
 * Supprime une entrée de présence pour un étudiant
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
export const deletePresence = async (req, res) => {
  try {
    const presenceId = req.params.id;

    const deletedPresence = await PresenceStudent.findOneAndUpdate(
      { _id: presenceId, isDeleted: false },
      { isDeleted: true },
      { new: true }
    );

    if (!deletedPresence) {
      res
        .status(404)
        .send(
          "L'entrée de présence à supprimer pour l'étudiant n'a pas été trouvée"
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
