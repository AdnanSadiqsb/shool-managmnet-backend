const Fee = require("../models/Fee");
const Student = require("../models/Student");
const Class = require("../models/Class");
const { findByIdAndUpdate } = require("../models/Section");

const getFee = async (req, res) => {
  try {
    const fee = await Fee.findById(req.params.id);
    res.status(200).json(fee);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllFee = async (req, res) => {
  try {
    const fees = await Fee.find({});
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createFee = async (req, res) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(200).send("Fee Created Successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateFee = async (req, res) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send("Fee updated successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteFee = async (req, res) => {
  res.send("delete fee");
  try {
  } catch (error) {
    res.status(500).json(error);
  }
};

const FeeAddClasses = async (req, res) => {
  try {
    const { classes } = req.body;
    await Fee.findByIdAndUpdate(req.params.id, {
      $push: { assignedClass: classes },
    });

    await Promise.all([
        ...classes.map((cls) => {
            return Student.updateMany(
              { class: cls },
              { $push: { fee: req.params.id } }
            );
        })
    ])

    res.status(200).send("Fee assigned to classes successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const FeeRemoveClasses = async (req, res) => {
  try {
    const { classes } = req.body;
    await Fee.findByIdAndUpdate(req.params.id, {
      $pull: { assignedClass: {$in: classes} },
    });

    await Promise.all([
      ...classes.map((cls) => {
        return Student.updateMany(
          { class: cls },
          { $pull: { fee: req.params.id } }
        );
      }),
    ]);

    res.status(200).send("Fee unassigned to classes successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const FeeAddStudents = async (req, res) => {
  try {
    const { roll_number } = req.body;

    const student = await Student.findOne({roll_number: roll_number});

    await Fee.findByIdAndUpdate(req.params.id, {
      $push: { assignedStudent: student._id },
    });
    
    await Student.updateOne(
      { _id: student._id },
      { $push: { fee: req.params.id } }
    );

    res.status(200).send("Fee assigned to Student successfully");

  } catch (error) {
    res.status(500).json(error);
  }
};

const FeeRemoveStudents = async (req, res) => {
  try {
     const { roll_number } = req.body;

     const student = await Student.findOne({ roll_number: roll_number });

     await Fee.findByIdAndUpdate(req.params.id, {
       $pull: { assignedStudent: student._id },
     });

     await Student.updateOne(
       { _id: student._id },
       { $pull: { fee: req.params.id } }
     );

     res.status(200).send("Fee unassigned to Student successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getFee,
  getAllFee,
  createFee,
  updateFee,
  deleteFee,
  FeeAddClasses,
  FeeRemoveClasses,
  FeeAddStudents,
  FeeRemoveStudents,
};
