import Teacher from "../models/teacher";
import User from "../models/user";
import integretyTester from "../../utils/integrety.utils";

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

  // basic checks for teacherInfos
  if (!teacherInfos.user)
    return res.status(400).json({ message: "UserId is required" });
  if (new Date(teacherInfos.hiringDate) > new Date())
    return res
      .status(400)
      .json({ message: "Hiring date cannot be in the future" });

  if (teacherInfos.salary && teacherInfos.salary < 0)
    return res.status(400).json({ message: "Salary cannot be negative" });
  if (teacherInfos.experienceYears && teacherInfos.experienceYears < 0)
    return res
      .status(400)
      .json({ message: "Experience years cannot be negative" });

  // basic checks for userInfos
  if (integretyTester.isEmail(userInfos.email) === false)
    return res.status(400).json({ message: "Email is not valid" });

  try {
    const user = await User.create(userInfos);
    const teacher = await Teacher.create({ ...teacherInfos, user: user._id });
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

/**
 * Retrieves all teachers.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of teachers.
 */
export async function getTeachers(req, res) {
  try {
    const teachers = await Teacher.find().populate({
      path: "user",
      select: "-password",
      match: { isDeleted: false },
    });
    if (!teachers) {
      return res.status(404).json({ message: "No teachers found" });
    }
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
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
  const { pageNumber, pageCount } = req.query;
  if (parseInt(pageNumber) || parseInt(pageCount)) {
    return res
      .status(400)
      .json({ message: "Invalid Page number and count are required" });
  }

  if (!id) return res.status(400).json({ message: "ID is required" });
  try {
    const teacher = await Teacher.findById(req.params.id)
      .skip(pageNumber * pageCount)
      .select(pageCount)
      .populate({
        path: "user",
        select: "-password",
      });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
  if (!id) return res.status(400).json({ message: "ID is required" });

  const { userInfos, teacherInfos } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, userInfos, { new: true });
    if (!user) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const teacher = await Teacher.findByIdAndUpdate(user._id, teacherInfos, {
      new: true,
    });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(404).json({ message: error.message });
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
  if (!id) return res.status(400).json({ message: "ID is required" });
  try {
    const teacher = await User.findByIdAndUpdate(id, { isDeleted: true });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
