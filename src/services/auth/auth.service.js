/**
 * Service d'authentification pour l'enregistrement et la connexion des utilisateurs.
 */
import UserService from "../api/user.service.js";
import User from "../../models/User.js";
import { HttpError } from "../../utils/exceptions.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default class AuthService {
  /**
   * Enregistre un nouvel utilisateur.
   * @param {Object} Userdata - Les données de l'utilisateur à enregistrer.
   * @returns {Object} - Un objet contenant le token généré et un message de succès.
   * @throws {HttpError} - Une erreur HTTP avec le code d'erreur approprié.
   */
  static async registerUser(Userdata) {
    try {
      const user = await UserService.createUser(Userdata);
      if (!user) {
        throw new HttpError(null, 404, "Utilisateur introuvable.");
      }

      const payload = {
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          role: user.role,
        },
      };

      // Signe le token
      let token;
      try {
        token = jwt.sign(payload, process.env.jwtSecret, {
          expiresIn: process.env.jwtExpiresIn,
        });
      } catch (error) {
        throw new HttpError(error, 500, "Échec de la génération du token.");
      }

      return {
        token,
        success: true,
        message: "Utilisateur enregistré et token généré avec succès.",
      };
    } catch (err) {
      if (err instanceof HttpError) throw err;
      if (err.name === "ValidationError") {
        throw new HttpError(err, 400, err.message);
      } else if (err.code === 11000) {
        throw new HttpError(err, 400, err.message);
      } else {
        throw new HttpError(err, 500, "Erreur interne du serveur.");
      }
    }
  }

  /**
   * Connecte un utilisateur existant.
   * @param {Object} Userdata - Les données de l'utilisateur à connecter.
   * @returns {Object} - Un objet contenant le token généré et un message de succès.
   * @throws {HttpError} - Une erreur HTTP avec le code d'erreur approprié.
   */
  static async loginUser(Userdata) {
    try {
      const { email, password } = Userdata;

      // Vérification si l'utilisateur existe
      let user = await User.findOne({ email });
      if (!user) {
        throw new HttpError(null, 400, "Identifiants invalides");
      }

      // Vérification du mot de passe
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new HttpError(null, 400, "Identifiants invalides");
      }

      // Création du token JWT
      const payload = {
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
        },
      };

      let token;
      try {
        token = jwt.sign(payload, process.env.jwtSecret, {
          expiresIn: process.env.jwtExpiresIn,
        });
      } catch (error) {
        throw new HttpError(error, 500, "Échec de la génération du token.");
      }

      return {
        token,
        success: true,
        message: "Authentifié",
      };
    } catch (error) {
      if (error instanceof HttpError) throw error;
      throw new HttpError(error, 500, "Erreur du serveur");
    }
  }
}
