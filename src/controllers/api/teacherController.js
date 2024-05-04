import Teacher from "../../models/Teacher.js";
import User from "../../models/User.js";
import integretyTester from "../../utils/integrety.utils.js";

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
    // Validate teacherInfos
    if (new Date(teacherInfos.hiringDate) > new Date()) {
      return res
        .status(400)
        .json({ message: "Hiring date cannot be in the future" });
    }
    if (teacherInfos.salary && teacherInfos.salary < 0) {
      return res.status(400).json({ message: "Salary cannot be negative" });
    }
    if (teacherInfos.experienceYears && teacherInfos.experienceYears < 0) {
      return res
        .status(400)
        .json({ message: "Experience years cannot be negative" });
    }

    // Validate userInfos
    if (!integretyTester.isEmail(userInfos.email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // Create the user document
    const user = await User.create(userInfos);

    // Create the teacher document associated with the created user
    const teacher = await Teacher.create({
      ...teacherInfos,
      user: user._id,
    });

    // Respond with the created teacher document
    res.status(201).json(teacher);
  } catch (error) {
    // Handle errors during document creation
    let errorMessage = "Failed to create teacher.";
    if (error.name === "ValidationError") {
      errorMessage = error.message; // Mongoose validation error
    } else if (error.code === 11000) {
      errorMessage = "Duplicate key error. Please check unique fields.";
    }
    res.status(400).json({ message: errorMessage });
  }
}

/**
 * Retrieves all teachers.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves with the list of teachers.
 */
export async function getTeachers(req, res) {
  const { pageNumber = 0, pageCount = 20 } = req.query;

  if (isNaN(parseInt(pageNumber)) || isNaN(parseInt(pageCount))) {
    return res
      .status(400)
      .json({ message: "Invalid Page number and count are required" });
  }

  try {
    const teachers = await Teacher.find()
      .skip(parseInt(pageNumber) * parseInt(pageCount)) // Calculate skip value based on pageNumber and pageCount
      .limit(parseInt(pageCount)); // Limit the number of documents returned per page
    // .populate({
    //   path: "user",
    //   select: "-password", // Exclude password field from populated user
    //   match: { isDeleted: false }, // Filter populated user documents where isDeleted is false
    // });

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({ message: "No teachers found" });
    }

    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
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

  if (!id) return res.status(400).json({ message: "ID is required" });
  try {
    const teacher = await Teacher.findById(req.params.id);
    // .populate({
    //   path: "user",
    //   select: "-password",
    // });
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
  if (!userInfos || !teacherInfos)
    return res
      .status(400)
      .json({ message: "User and Teacher infos are required" });

  try {
    delete teacherInfos.user;
    teacherInfos.isDeleted = false;
    const user = await User.findByIdAndUpdate(id, userInfos, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const teacher = await Teacher.findByIdAndUpdate(
      { user: user._id },
      teacherInfos,
      {
        new: true,
      }
    );
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
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    const user = await User.findByIdAndUpdate(teacher.user, {
      isDeleted: true,
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
