const express = require("express");
const { getAllSections } = require("../controllers/section");


const router = express.Router();

router.get("/", getAllSections);

module.exports = router;
