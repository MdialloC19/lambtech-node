import Student from "../../models/Student.js";
import User from "../../models/User.js";

/**
 * @route   GET api/students
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

/**
 * @route   POST api/students
 * @desc    Create a new student
 * @access  Public
 */
const createStudent = async (req, res) => {
  try {
    // Verify if user exist
    const existingUser = await User.findById(req.body.user);
    if (!existingUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    // create student
    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

/**
 * @route   GET api/students/:id
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
 * @route   PUT api/students/:id
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
 * @route   DELETE api/students/:id
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
