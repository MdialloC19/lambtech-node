import express from "express";
import appRoutes from "./app.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import studentRoutes from "./student.routes.js";

const router = express.Router();

router.use("/app", appRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/student", studentRoutes);

//export default
export default router;
