import User from "../../models/User.js";
import { HttpError } from "../../utils/exceptions.js";
import integretyTester from "../../utils/integrety.utils.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";

export default class UserService {
  /**
   * Valide les données de l'utilisateur avant de créer un nouvel utilisateur.
   * @param {Object} userData - Données de l'utilisateur à valider.
   * @returns {Object} - Données de l'utilisateur validées.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la validation échoue.
   */
  static async validateUserData(userData) {
    const errors = validationResult(userData);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: "tester" });
    }

    const {
      firstname,
      lastname,
      dateofbirth,
      placeofbirth,
      nationality,
      address,
      sexe,
      email,
      password,
      role,
      phone,
      isDeleted = false,
      ...rest // Capture tous les champs supplémentaires non destructurés explicitement
    } = userData;

    // Objet des champs validés
    const validatedUserData = {};

    // Vérifications de base
    if (!firstname || typeof firstname !== "string") {
      throw new HttpError(
        null,
        400,
        "Le prénom est requis et doit être une chaîne de caractères."
      );
    }
    validatedUserData.firstname = firstname;

    if (!lastname || typeof lastname !== "string") {
      throw new HttpError(
        null,
        400,
        "Le nom de famille est requis et doit être une chaîne de caractères."
      );
    }
    validatedUserData.lastname = lastname;

    if (!new Date(dateofbirth)) {
      throw new HttpError(null, 400, "Date de naissance invalide.");
    }
    validatedUserData.dateofbirth = new Date(dateofbirth);

    if (!placeofbirth || typeof placeofbirth !== "string") {
      throw new HttpError(
        null,
        400,
        "Le lieu de naissance est requis et doit être une chaîne de caractères."
      );
    }
    validatedUserData.placeofbirth = placeofbirth;

    if (!nationality || typeof nationality !== "string") {
      throw new HttpError(
        null,
        400,
        "La nationalité est requise et doit être une chaîne de caractères."
      );
    }
    validatedUserData.nationality = nationality;

    if (!address || typeof address !== "string") {
      throw new HttpError(
        null,
        400,
        "L'adresse est requise et doit être une chaîne de caractères."
      );
    }
    validatedUserData.address = address;

    if (!sexe || !["M", "F"].includes(sexe)) {
      throw new HttpError(
        null,
        400,
        "Le sexe doit être 'M' (Masculin) ou 'F' (Féminin)."
      );
    }
    validatedUserData.sexe = sexe;

    if (!integretyTester.isEmail(email)) {
      throw new HttpError(null, 400, "Format d'email invalide.");
    }
    validatedUserData.email = email;

    if (!password || typeof password !== "string" || password.length < 6) {
      throw new HttpError(
        null,
        400,
        "Le mot de passe est requis et doit comporter au moins 6 caractères."
      );
    } else {
      // Hash du mot de passe
      const salt = await bcrypt.genSalt(10);
      const cryptPassword = await bcrypt.hash(password, salt);
      validatedUserData.password = cryptPassword;
    }

    if (
      role &&
      !["STUDENT", "TEACHER", "ADMIN", "SUPERADMIN"].includes(
        role.toUpperCase()
      )
    ) {
      throw new HttpError(null, 400, "Rôle utilisateur invalide.");
    }

    validatedUserData.role = role;

    if (!phone || typeof phone !== "string") {
      throw new HttpError(
        null,
        400,
        "Le numéro de téléphone est requis et doit être un nombre."
      );
    }
    validatedUserData.phone = phone;

    // Vérifie s'il y a des champs supplémentaires qui n'ont pas été validés explicitement
    if (Object.keys(rest).length > 0) {
      throw new HttpError(null, 400, "Champs supplémentaires invalides.");
    }

    return validatedUserData;
  }

  /**
   * Crée un nouvel utilisateur.
   * @param {Object} userData - Données pour le nouvel utilisateur.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur créé.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la création de l'utilisateur échoue.
   */
  static async createUser(userData) {
    try {
      // Valider les données de l'utilisateur
      const validatedUserData = await UserService.validateUserData(userData);

      // Créer un nouvel utilisateur en utilisant le modèle Mongoose
      const user = await User.create(validatedUserData);

      return user;
    } catch (error) {
      console.error(error);
      if (error instanceof HttpError) {
        throw error; // Renvoie l'erreur HTTP personnalisée
      } else if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new HttpError(error, 400, "L'email existe déjà.");
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "ID invalide.");
      } else {
        throw new HttpError(error, 500, "Erreur interne du serveur."); // Par défaut, renvoie 500 pour les erreurs inattendues
      }
    }
  }

  /**
   * Met à jour un utilisateur existant par ID.
   * @param {string} userId - ID de l'utilisateur à mettre à jour.
   * @param {Object} updatedUserData - Données mises à jour pour l'utilisateur.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur mis à jour.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la mise à jour de l'utilisateur échoue.
   */
  static async updateUser(userId, updatedUserData) {
    try {
      // Valider les données de l'utilisateur mises à jour
      const validatedUserData = UserService.validateUserData(updatedUserData);

      // Mettre à jour l'utilisateur en utilisant le modèle Mongoose
      const user = await User.findByIdAndUpdate(userId, validatedUserData, {
        new: true,
      });

      if (!user) {
        throw new HttpError(null, 404, "Utilisateur introuvable.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Renvoie l'erreur HTTP personnalisée
      } else {
        throw new HttpError(error, 500, "Erreur interne du serveur."); // Par défaut, renvoie 500 pour les erreurs inattendues
      }
    }
  }

  /**
   * Supprime un utilisateur existant par ID.
   * @param {string} userId - ID de l'utilisateur à supprimer.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur supprimé.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la suppression de l'utilisateur échoue.
   */
  static async deleteUser(userId) {
    try {
      // Trouve et supprime l'utilisateur en utilisant le modèle Mongoose
      const user = await User.findByIdAndUpdate(userId, {
        isDeleted: true,
      });

      if (!user) {
        throw new HttpError(null, 404, "Utilisateur introuvable.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Renvoie l'erreur HTTP personnalisée
      } else {
        throw new HttpError(error, 500, "Erreur interne du serveur."); // Par défaut, renvoie 500 pour les erreurs inattendues
      }
    }
  }

  /**
   * Récupère un utilisateur existant par ID.
   * @param {string} userId - ID de l'utilisateur à récupérer.
   * @returns {Promise<Object>} - Promesse résolue avec l'utilisateur récupéré.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la récupération de l'utilisateur échoue.
   */
  static async getUserById(userId) {
    try {
      // Trouve l'utilisateur par ID en utilisant le modèle Mongoose
      const user = await User.findById(userId);

      if (!user) {
        throw new HttpError(error, 404, "Utilisateur introuvable.");
      }

      return user;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Renvoie l'erreur HTTP personnalisée
      } else {
        throw new HttpError(error, 500, "Erreur interne du serveur."); // Par défaut, renvoie 500 pour les erreurs inattendues
      }
    }
  }

  /**
   * Récupère tous les utilisateurs.
   * @returns {Promise<Array>} - Promesse résolue avec un tableau de tous les utilisateurs.
   * @throws {HttpError} - Lance une erreur HTTP personnalisée si la récupération des utilisateurs échoue.
   */
  static async getAllUsers() {
    try {
      // Trouve tous les utilisateurs en utilisant le modèle Mongoose
      const users = await User.find();

      if (users.length === 0) {
        throw new HttpError(error, 404, "Aucun utilisateur trouvé.");
      }

      return users;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Renvoie l'erreur HTTP personnalisée
      } else {
        throw new HttpError(error, 500, "Erreur interne du serveur."); // Par défaut, renvoie 500 pour les erreurs inattendues
      }
    }
  }
}
