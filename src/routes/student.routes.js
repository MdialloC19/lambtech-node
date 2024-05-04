import express from "express";
const router = express.Router();

import {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/api/studentController.js";

// Get all students
router.get("/", getStudents);

// Create a new student
router.post("/", createStudent);

// Get a single student by ID
router.get("/:id", getStudentById);

// Update a student
router.put("/:id", updateStudent);

// Delete a student
router.delete("/:id", deleteStudent);

export default router;
