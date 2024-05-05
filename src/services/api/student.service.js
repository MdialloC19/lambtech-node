import Student from "../../models/Student.js";
import User from "../../models/User.js";
import integretyTester from "../../utils/integrety.utils.js";
import { HttpError } from "../../utils/exceptions.js";
import APIFeatures from "../../utils/apiFeatures.js";

export default class StudentService {
  /**
   * Retrieves all students based on query parameters.
   * @param {Object} query - Query parameters for filtering, sorting, pagination, etc.
   * @returns {Promise<Array>} - Promise resolved with an array of students.
   * @throws {HttpError} - Throws a custom HTTP error if student retrieval fails.
   */
  static async getAllStudents(query) {
    try {
      const features = new APIFeatures(Student.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const students = await features.query;
      return students;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Creates a new student.
   * @param {Object} studentData - Data for the new student.
   * @param {Object} userData - Data for the associated user.
   * @returns {Promise<Object>} - Promise resolved with the created student.
   * @throws {HttpError} - Throws a custom HTTP error if student creation fails.
   */
  static async createStudent(studentData, userData) {
    try {
      if (!integretyTester.isEmail(userData.email)) {
        throw new HttpError(400, "Email is not valid.");
      }

      const user = await User.create(userData);
      const student = await Student.create({ ...studentData, user: user._id });
      return student;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new HttpError(400, error.message);
      } else if (error.code === 11000) {
        throw new HttpError(
          400,
          "Duplicate key error. Please check unique fields."
        );
      } else {
        throw new HttpError(500, "Internal server error.");
      }
    }
  }

  /**
   * Retrieves a single student by ID.
   * @param {string} studentId - ID of the student to retrieve.
   * @returns {Promise<Object>} - Promise resolved with the retrieved student.
   * @throws {HttpError} - Throws a custom HTTP error if student retrieval fails.
   */
  static async getStudentById(studentId) {
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        throw new HttpError(404, "Student not found.");
      }
      return student;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Updates an existing student by ID.
   * @param {string} studentId - ID of the student to update.
   * @param {Object} updatedData - Updated data for the student.
   * @returns {Promise<Object>} - Promise resolved with the updated student.
   * @throws {HttpError} - Throws a custom HTTP error if student update fails.
   */
  static async updateStudent(studentId, updatedData) {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        updatedData,
        { new: true }
      );
      if (!updatedStudent) {
        throw new HttpError(404, "Student not found.");
      }
      return updatedStudent;
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }

  /**
   * Deletes an existing student by ID.
   * @param {string} studentId - ID of the student to delete.
   * @returns {Promise<Object>} - Promise resolved with the deleted student.
   * @throws {HttpError} - Throws a custom HTTP error if student deletion fails.
   */
  static async deleteStudent(studentId) {
    try {
      const student = await Student.findById(studentId);
      if (!student) {
        throw new HttpError(404, "Student not found.");
      }
      await student.remove();
      // Mark associated user as deleted
      await User.findByIdAndUpdate(student.user, { isDeleted: true });
      return { message: "Student removed" };
    } catch (error) {
      throw new HttpError(500, "Internal server error.");
    }
  }
}
