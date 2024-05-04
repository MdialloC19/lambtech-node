import express from "express";
import middleware from "../middlewares/auth.middleware.js";
import auth from "../controllers/api/authController.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Welcome to the authentication." });
});

/**
 * @desc Route to register user
 * @route POST api/users
 * @access Private available for Admin
 */
router.post("/register", middleware.validateRegister, auth.authRegisterUser);

/**
 * @desc Route to log a user
 * @route POST api/users
 * @access Private available for Admin
 */
router.post("/login", middleware.validateLogin, auth.authLoginUser);

export default router;
