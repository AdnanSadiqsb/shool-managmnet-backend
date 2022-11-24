const Section = require("../models/Section");
const Class = require("../models/Class");


const getAlltoAllSections = async (req, res) => {
  try {
    const allSections = await Section.find({});
    res.status(200).json(allSections);
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllSections = async (req, res) => {
  try {
    console.log("hlo word")
    const classId = req.params.id;
    const myClass = await Class.findById(classId);
    const sections = await Promise.all(
      [
        ...myClass.sections.map( (section) => {
          return Section.findById(section);
        })
      ]
    )

    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getSection = async (req, res) => {
  try {
    const sectionId = req.params.id;
    const mySection = await Section.findById(sectionId);

    res.status(200).json(mySection);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createSection = async (req, res) => {
  try {
    const { classId, name, status } = req.body;
    const mySection = await Section.create({ name: name, status: status });
    const updatedClass = await Class.findByIdAndUpdate(classId, {
      $push: { sections: mySection._id },
    });
    res.status(200).json(updatedClass);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSection = await Section.findByIdAndUpdate(id, req.body);

    res.status(200).json("Successfully Updated Section");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteSection = async (req, res) => {
  try {
    
    const { sectionId, classId } = req.query;
    const deletedSection = await Section.findByIdAndDelete(sectionId);
    const updatedClass = await Class.findByIdAndUpdate(classId, {
      $pull: { sections: deletedSection._id },
    });

    res.status(200).send("Section Deleted Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  getAlltoAllSections
};
