const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

const getStudent = async (req, res) => {
   try {
    const student = await Student.findById(req.params.id).populate(["class","section"]);
    res.status(200).json(student);
   } catch (error) {
    res.status(500).json(error)
   }
}

const createStudent = async (req, res) => {

    try {
        const student = await Student.create(req.body);
        res.status(200).json("Student created Successfully");
    } catch (error) {
      res.status(500).json(error);
    }

};

const getAllStudents = async (req, res) => {
    try {
      const students = await Student.find({}).populate('class');
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json(error);
    }

};

const updateStudent = async (req, res) => {
    try {
      const students = await Student.findByIdAndUpdate(req.params.id, req.body);
      res.status(200).send("Student Updated Successfully");
    } catch (error) {
      res.status(500).json(error);
    }

};

const deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id)
        res.status(200).send("Student Deleted Successfully");
    } catch (error) {
      res.status(500).json(error);
    }

};

module.exports = {getStudent, getAllStudents, createStudent, updateStudent, deleteStudent};

