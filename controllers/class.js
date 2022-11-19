const Class = require("../models/Class");

const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find({});
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getClass = async (req, res) => {
  try {
    const oneClass = await Class.findById(req.params.id);
    res.status(200).json(oneClass);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createClass = async (req, res) => {
  try {
    const createdClass = await Class.create(req.body);
    res.status(200).send("Class Created Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateClass = async (req, res) => {
  try {
    const updateClass = await Class.findByIdAndUpdate(req.params.id, {$set: req.body});
    res.status(200).send("Class updated Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteClass = async (req, res) => {
  try {
    const deletedClass = await Class.findByIdAndDelete(req.params.id);
    res.status(200).send("Class Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllClasses,
  getClass,
  createClass,
  updateClass,
  deleteClass,
};
