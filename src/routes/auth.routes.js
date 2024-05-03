import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "Welcome to the authentication." });
});

router.post("/register", /* middleware.validateRegister, */ (req, res) => {

});
router.post("/login", /* middleware.validateLogin, */ (req, res) => {

});


export default router;