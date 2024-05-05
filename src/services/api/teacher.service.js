import Teacher from "../../models/Teacher.js";
import UserService from "./user.service.js";
import { HttpError } from "../../utils/exceptions.js";

export default class TeacherService {
  /**
   * Validates teacher data before creating a new teacher.
   * @param {Object} teacherData - Teacher data to validate.
   * @returns {Object} - Validated teacher data.
   * @throws {HttpError} - Throws a custom HTTP error if validation fails.
   */
  static validateTeacherData(teacherData) {
    const {
      rank,
      hiringDate,
      qualification,
      experienceYears,
      salary,
      schedule,
    } = teacherData;

    // Basic validation checks
    if (rank && typeof rank !== "string") {
      throw new HttpError(null, 400, "Rank is required and must be a string.");
    }

    if (hiringDate && (!(hiringDate instanceof Date) || isNaN(hiringDate))) {
      throw new HttpError(null, 400, "Invalid hiring date.");
    }

    if (hiringDate && new Date(teacherInfos.hiringDate) > new Date()) {
      throw new HttpError(null, 400, "Hiring date cannot be in the future.");
    }

    if (qualification && !Array.isArray(qualification)) {
      throw new HttpError(null, 400, "Qualification must be an array.");
    }

    if (
      (experienceYears && typeof experienceYears !== "number") ||
      experienceYears < 0
    ) {
      throw new HttpError(
        err,
        400,
        "Experience years must be a non-negative number."
      );
    }

    if (salary && (typeof salary !== "number" || salary < 0)) {
      throw new HttpError(null, 400, "Salary must be a non-negative number.");
    }

    if (schedule && (!Array.isArray(schedule) || schedule.length === 0)) {
      throw new HttpError(null, 400, "Schedule must be a non-empty array.");
    }

    // if (schedule)
    //   for (const slot of schedule) {
    //     const { dayOfWeek, startTime, endTime } = slot;
    //     if (!dayOfWeek || !startTime || !endTime) {
    //       throw new HttpError(
    //         null,
    //         400,
    //         "Schedule slot is missing required fields."
    //       );
    //     }
    //   }

    return teacherData;
  }

  /**
   * Creates a new teacher.
   * @param {Object} userData - Data for the associated user.
   * @param {Object} teacherData - Data for the new teacher.
   * @returns {Promise<Object>} - Promise resolved with the created teacher.
   * @throws {HttpError} - Throws a custom HTTP error if teacher creation fails.
   */
  static async createTeacher(userData, teacherData) {
    try {
      // Validate teacher data
      const validatedTeacherData =
        TeacherService.validateTeacherData(teacherData);

      // Create associated user
      const user = await UserService.createUser(userData);

      // Create new teacher using Mongoose model
      const teacher = await Teacher.create({
        ...validatedTeacherData,
        user: user._id,
      });

      return teacher;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "ValidationError") {
        throw new HttpError(error, 400, error.message);
      } else if (error.name === "MongoServerError" && error.code === 11000) {
        throw new HttpError(error, 400, "Email already exists.");
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Updates an existing teacher by ID.
   * @param {string} teacherId - ID of the teacher to update.
   * @param {Object} updatedTeacherData - Updated data for the teacher.
   * @param {Object} updatedUserData - Updated data for the user ref.
   * @returns {Promise<Object>} - Promise resolved with the updated teacher.
   * @throws {HttpError} - Throws a custom HTTP error if teacher update fails.
   */
  static async updateTeacher(teacherId, updatedTeacherData, updatedUserData) {
    try {
      // Validate updated teacher data
      const validatedTeacherData =
        TeacherService.validateTeacherData(updatedTeacherData);

      // Update teacher using Mongoose model
      const teacher = await Teacher.findByIdAndUpdate(
        teacherId,
        validatedTeacherData,
        {
          new: true,
        }
      );

      if (!teacher) {
        throw new HttpError(null, 404, "Teacher not found.");
      }

      // update user
      const user = await UserService.updateUser(teacher.user, updatedUserData);
      if (!user) {
        throw new HttpError(null, 404, "User not found.");
      }

      return teacher;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Deletes an existing teacher by ID.
   * @param {string} teacherId - ID of the teacher to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted teacher.
   * @throws {HttpError} - Throws a custom HTTP error if teacher deletion fails.
   */
  static async deleteTeacher(teacherId) {
    try {
      // Find and delete teacher using Mongoose model
      const teacher = await Teacher.findOne(teacherId).populate("user");

      if (!teacher) {
        throw new HttpError(null, 404, "Teacher not found.");
      }

      // mark associated user as deleted
      const user = await UserService.deleteUser(teacher.user._id);
      if (!user) {
        throw new HttpError(null, 404, "User not found.");
      }

      return teacher;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Retrieves an existing teacher by ID.
   * @param {string} teacherId - ID of the teacher to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved teacher.
   * @throws {HttpError} - Throws a custom HTTP error if teacher retrieval fails.
   */
  static async getTeacherById(teacherId) {
    try {
      // Find teacher by ID using Mongoose model
      const teacher = await Teacher.findById(teacherId).populate(
        "user",
        "-password"
      );

      if (!teacher) {
        throw new HttpError(null, 404, "Teacher not found.");
      }

      return teacher;
    } catch (error) {
      if (error instanceof HttpError) {
        throw error; // Rethrow the custom HttpError
      } else if (error.name === "CastError") {
        throw new HttpError(error, 400, "Invalid ID.");
      } else {
        throw new HttpError(error, 500, "Internal server error."); // Default to 500 for unexpected errors
      }
    }
  }

  /**
   * Retrieves all teachers.
   * @param {Object} pagination - Pagination options.
   * @param {number}pagination.pageNumber - The page number to retrieve.
   * @param {number} pagination.pageCount - The number of items to retrieve per page.
   * @returns {Promise<Array>} - Promise resolved with an array of teachers.
   * @throws {HttpError} - Throws a custom HTTP error if teacher retrieval fails.
   */
  static async getTeachers(pagination) {
    try {
      // Fetch all teachers using Mongoose model
      const teachers = await Teacher.find()
        .populate("user", "-password")
        .skip((pagination.pageNumber - 1) * pagination.pageCount)
        .limit(pagination.pageCount);
      if (teachers.length === 0) {
        throw new HttpError(null, 404, "No teachers found.");
      }
      return teachers;
    } catch (error) {
      throw new HttpError(error, 500, "Internal server error.");
    }
  }
}
