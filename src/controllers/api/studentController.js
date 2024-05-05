import StudentService from "../../services/api/student.service.js";
import { HttpError } from "../../utils/exceptions.js";

/**
 * Get all students.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getStudents(req, res) {
  try {
    const students = await StudentService.getAllStudents(req.query);
    res.json(students);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Create a new student.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function createStudent(req, res) {
  const { studentInfos, userInfos } = req.body;
  try {
    const student = await StudentService.createStudent(studentInfos, userInfos);
    res.status(201).json(student);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Get a student by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function getStudentById(req, res) {
  const { id } = req.params;
  try {
    const student = await StudentService.getStudentById(id);
    res.json(student);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Update a student.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function updateStudent(req, res) {
  const { id } = req.params;
  try {
    const updatedStudent = await StudentService.updateStudent(id, req.body);
    res.json(updatedStudent);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}

/**
 * Delete a student.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the operation is complete.
 */
export async function deleteStudent(req, res) {
  const { id } = req.params;
  try {
    const result = await StudentService.deleteStudent(id);
    res.json(result);
  } catch (error) {
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
}
