import Student from "../../models/Student.js";
import User from "../../models/User.js";
import integretyTester from "../../utils/integrety.utils.js";

/**
 * @route   GET
 * @desc    Get all students
 * @access  Public
 */
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// /**
//  * @route   POST
//  * @desc    Create a new student
//  * @access  Public
//  */
// const createStudent = async (req, res) => {
//   try {
//     // Verify if user exist
//     const existingUser = await User.findById(req.body.user);
//     if (!existingUser) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     // create student
//     const newStudent = await Student.create(req.body);
//     res.status(201).json(newStudent);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server Error");
//   }
// };

/**
 * Creates a new student.
 * @param {ExpressRequest} req - The request object.
 * @param {ExpressResponse} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the student is created.
 */
const createStudent = async (req, res) => {
  const { studentInfos, userInfos } = req.body;

  try {
    // Validate userInfos
    if (!integretyTester.isEmail(userInfos.email)) {
      return res.status(400).json({ message: "Email is not valid" });
    }

    // Create the user document
    const user = await User.create(userInfos);

    // Create the student document associated with the created user
    const student = await Student.create({
      ...studentInfos,
      user: user._id,
    });

    // Respond with the created student document
    res.status(201).json(student);
  } catch (error) {
    // Handle errors during document creation
    let errorMessage = "Failed to create student.";
    if (error.name === "ValidationError") {
      errorMessage = error.message; // Mongoose validation error
    } else if (error.code === 11000) {
      errorMessage = "Duplicate key error. Please check unique fields.";
    }
    res.status(400).json({ message: errorMessage });
  }
};

/**
 * @route   GET /:id
 * @desc    Get a single student by ID
 * @access  Public
 */
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   PUT /:id
 * @desc    Update a student
 * @access  Public
 */
const updateStudent = async (req, res) => {
  try {
    let student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
    student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   DELETE /:id
 * @desc    Delete a student
 * @access  Public
 */
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    // Marquer l'étudiant comme supprimé
    student.isDeleted = true;
    await student.save();

    // Mettre à jour isDeleted de l'utilisateur associé
    await User.findOneAndUpdate(
      { _id: student.user },
      { $set: { isDeleted: true } }
    );

    res.json({ msg: "Student removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

export {
  getStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
};
