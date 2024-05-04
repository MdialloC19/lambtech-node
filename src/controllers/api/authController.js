import { validationResult } from "express-validator";
import User from "../../models/User.js";
import bcrypt from "bcryptjs";
// const config = require("config");
import jwt from "jsonwebtoken";

const authRegisterUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, phone, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      });
    }

    user = new User({
      username,
      email,
      phone,
      password,
    });

    // Encrypt password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken

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
        return res.status(201).json({
          token,
          sucess: true,
          message: "User registered",
        });
      }
    );
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      sucess: false,
      error: [error.message],
    });
  }
};

// const authLoginUser = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { email, password } = req.body;
//   // console.log(email, password);

//   try {
//     let user = await User.findOne({ email });
//     console.log(user);
//     //see if user exists
//     if (!user) {
//       return res.status(400).json({
//         errors: [{ msg: "Invalid Credentials user" }],
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       return res.status(400).json({
//         errors: [{ msg: "Invalid Credentials" }],
//       });
//     }
//     // Encrypt password

//     // Return jsonwebtoken

//     const payload = {
//       user: {
//         id: user.id,
//         username: user.username,
//         role: user.role,
//       },
//     };

//     jwt.sign(
//       payload,
//       process.env.jwtSecret,
//       { expiresIn: "5 days" },
//       (err, token) => {
//         if (err) throw err;
//         return res.status(201).json({
//           token,
//           sucess: true,
//           message: "Authentificated",
//         });
//       }
//     );
//     return res.status(201).json({
//       sucess: true,
//       message: "Authentificated",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       sucess: false,
//       error: error.message,
//     });
//   }
// };

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
