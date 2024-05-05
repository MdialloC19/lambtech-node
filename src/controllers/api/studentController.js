import StudentService from "../../services/api/student.service.js";

// JSDoc typedefs
/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Get all students.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>}
 */
export async function getStudents(req, res) {
  try {
    const students = await StudentService.getAllStudents(req.query);
    res.json(students);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Create a new student.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>}
 */
export async function createStudent(req, res) {
  const { studentInfos, userInfos } = req.body;
  try {
    const student = await StudentService.createStudent(studentInfos, userInfos);
    res.status(201).json(student);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Get a student by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>}
 */
export async function getStudentById(req, res) {
  const { id } = req.params;
  try {
    const student = await StudentService.getStudentById(id);
    res.json(student);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Update a student.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>}
 */
export async function updateStudent(req, res) {
  const { id } = req.params;
  try {
    const updatedStudent = await StudentService.updateStudent(id, req.body);
    res.json(updatedStudent);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}

/**
 * Delete a student.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>}
 */
export async function deleteStudent(req, res) {
  const { id } = req.params;
  try {
    const result = await StudentService.deleteStudent(id);
    res.json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
}
