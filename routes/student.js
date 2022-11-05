const express = require("express");
const {
  getStudent,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/student");
const router = express.Router();

router.get("/:id", getStudent);
router.get("/", getAllStudents);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
