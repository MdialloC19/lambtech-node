import express from "express";
import middleware from "../middlewares/auth.middleware.js";
import controller from "../controllers/auth/auth.controller.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the authentication." });
});

router.post("/register", middleware.validateRegister, controller.register);
router.post("/login",middleware.validateLogin, controller.login);


export default router;