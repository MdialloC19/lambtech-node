import express from "express";
import appRoutes from "./app.routes.js";
import authRoutes from "./auth.routes.js";

const router = express.Router();

router.use("/app", appRoutes);
router.use("/auth", authRoutes);

//export default
export default router;