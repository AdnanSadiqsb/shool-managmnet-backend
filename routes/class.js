const express = require("express");
const {getAllClasses, getClass, createClass, updateClass, deleteClass} = require("../controllers/class");

const router = express.Router();

router.get('/', getAllClasses);
router.get('/:id', getClass);
router.post('/', createClass);
router.patch("/:id", updateClass);
router.delete("/:id", deleteClass);

module.exports = router;