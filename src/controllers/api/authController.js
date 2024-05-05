import { validationResult } from "express-validator";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Enregistre un nouvel utilisateur
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const authRegisterUser = async (req, res) => {
  // Validation des données de la requête
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
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
    phone,
    password,
    role,
  } = req.body;

  try {
    // Vérifie si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    // Crée un nouvel utilisateur
    user = new User({
      firstname,
      lastname,
      dateofbirth,
      placeofbirth,
      nationality,
      address,
      sexe,
      email,
      phone,
      password,
      role,
    });

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Enregistre l'utilisateur dans la base de données
    await user.save();

    // Crée un token JWT
    const payload = {
      user: {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
    };

    // Signe le token
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        return res.status(201).json({
          token,
          success: true,
          message: "User registered",
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: [error.message],
    });
  }
};

/**
 * Authentifie un utilisateur
 * @param {import('express').Request} req - Requête Express
 * @param {import('express').Response} res - Réponse Express
 * @returns {Promise<void>} - Promesse indiquant la fin du traitement
 */
const authLoginUser = async (req, res) => {
  try {
    // Validation des champs
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Vérification si l'utilisateur existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    // Vérification du mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }],
      });
    }

    // Création du token JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: "5 days" },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          token,
          success: true,
          message: "Authenticated",
        });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

export default {
  authRegisterUser,
  authLoginUser,
};
