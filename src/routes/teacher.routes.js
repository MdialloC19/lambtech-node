import * as teacherController from "../controllers/api/teacherController.js";
import express from "express";
const router = express.Router();

/**
 * GET /teachers
 * Retrieves all teachers.
 */
router.get("/", teacherController.getTeachers);

/**
 * GET /teachers/:id
 * Retrieves a teacher by ID.
 * @param {string} id - The ID of the teacher.
 */
router.get("/:id", teacherController.getTeacherById);

/**
 * POST /teachers
 * Creates a new teacher.
 * @param {Teacher} teacher - The teacher object to be created.
 */
router.post("/", teacherController.createTeacher);

/**
 * PUT /teachers/:id
 * Updates a teacher by ID.
 * @param {string} id - The ID of the teacher to be updated.
 * @param {Teacher} teacher - The updated teacher object.
 */
router.put("/:id", teacherController.updateTeacher);

/**
 * DELETE /teachers/:id
 * Deletes a teacher by ID.
 * @param {string} id - The ID of the teacher to be deleted.
 */
router.delete("/:id", teacherController.deleteTeacher);

export default router;
