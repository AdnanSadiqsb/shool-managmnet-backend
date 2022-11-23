const express = require("express");
const {
  getAllSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  getAlltoAllSections
} = require("../controllers/section");

const router = express.Router();

router.get("/:id/all", getAllSections);
router.get("/:id", getSection);
router.post("/create", createSection);
router.patch("/:id", updateSection);
router.delete("/", deleteSection);
router.get("/all",getAlltoAllSections)
module.exports = router;
