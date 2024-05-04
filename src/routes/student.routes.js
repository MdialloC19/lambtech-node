import express from "express";

const router = express.Router();

// Get all students
router.get("/", (req, res) => {
  res.send("Student Route");
});

export default router;
