import TeacherService from "../../services/api/teacher.service.js";
import { DEFAULT_PAGINATION } from "../../utils/constants.js";

// JSDoc typedefs
/**
 * @typedef {import('express').Request} ExpressRequest
 * @typedef {import('express').Response} ExpressResponse
 */

/**
 * Creates a new teacher.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the teacher is created.
 */
export async function createTeacher(req, res) {
  const { teacherInfos, userInfos } = req.body;

  try {
    const teacher = await TeacherService.createTeacher(userInfos, teacherInfos);

    res.status(201).json(teacher);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Retrieves all teachers.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of teachers.
 */
export async function getTeachers(req, res) {
  const { page = 1, limit = DEFAULT_PAGINATION } = req.query;

  if (isNaN(parseInt(page)) || isNaN(parseInt(limit))) {
    return res
      .status(400)
      .json({ message: "Invalid Page number and count are required" });
  }

  const pagination = {
    pageNumber: parseInt(page),
    pageCount: parseInt(limit),
  };

  try {
    const teachers = TeacherService.getTeachers(pagination);
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
/**
 * Retrieves a teacher by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the teacher.
 */
export async function getTeacherById(req, res) {
  const { id } = req.params;

  try {
    const teacher = await TeacherService.getTeacherById(id);
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Updates a teacher by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the teacher is updated.
 */
export async function updateTeacher(req, res) {
  const { id } = req.params;

  const { userInfos, teacherInfos } = req.body;

  try {
    const teacher = await TeacherService.updateTeacher(
      id,
      userInfos,
      teacherInfos
    );
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

/**
 * Deletes a teacher by ID.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the teacher is deleted.
 */
export async function deleteTeacher(req, res) {
  const { id } = req.params;
  try {
    await TeacherService.deleteTeacher(id);
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    if (error instanceof HttpError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
