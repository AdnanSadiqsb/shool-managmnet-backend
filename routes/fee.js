const express = require("express");
const {getAllFee, getFee, createFee, updateFee, deleteFee, FeeAddClasses, FeeRemoveClasses, FeeAddStudents, FeeRemoveStudents} = require("../controllers/fee");

const router = express.Router();

router.get("/", getAllFee);

router.get('/:id', getFee);

router.post("/", createFee);

router.patch("/:id", updateFee);

router.delete("/:id", deleteFee);

router.post('/class/add/:id', FeeAddClasses);

router.post("/class/remove/:id", FeeRemoveClasses);

router.post("/student/add/:id", FeeAddStudents);

router.post("/student/remove/:id", FeeRemoveStudents);

module.exports = router;