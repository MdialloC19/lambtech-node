import express from "express";
import appRoutes from "./app.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import teacherRoutes from "./teacher.routes.js";
import studentRoutes from "./student.routes.js";
import adminRoutes from "./admin.routes.js";
import parentRoutes from "./parent.routes.js";

const router = express.Router();

router.use("/app", appRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/teacher", teacherRoutes);
router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/parent", parentRoutes);

//export default
export default router;
