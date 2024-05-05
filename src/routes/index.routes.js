import express from "express";
import appRoutes from "./app.routes.js";
import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import teacherRoutes from "./teacher.routes.js";
import studentRoutes from "./student.routes.js";
import adminRoutes from "./admin.routes.js";
import parentRoutes from "./parent.routes.js";
import formationRoutes from "./formation.routes.js";
import ueRoutes from "./ue.routes.js";
import niveauRoutes from "./niveau.routes.js";
import matiereRoutes from "./matiere.routes.js";
import evaluationRoutes from "./evaluation.routes.js";
import pointageRoutes from "./pointage.routes.js";

const router = express.Router();

router.use("/app", appRoutes);
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/teacher", teacherRoutes);
router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);
router.use("/parent", parentRoutes);
router.use("/formation", formationRoutes);
router.use("/ue", ueRoutes);
router.use("/niveau", niveauRoutes);
router.use("/matiere", matiereRoutes);
router.use("/evaluation", evaluationRoutes);
router.use("/pointage", pointageRoutes);

//export default
export default router;
