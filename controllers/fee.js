const Fee = require("../models/Fee");
const Student = require("../models/Student");
const Class = require("../models/Class");

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
    let classes = [];
    let students = [];

    const fees = await Fee.find({});

    Promise.all([
      Promise.all(
        fees.map((fee) => {
          return Student.find({ _id: { $in: fee.assignedStudent } });
        })
      ).then(function (data1) {
        students = data1;
      }),

      Promise.all(
        fees.map((fee) => {
          return Class.find({ _id: { $in: fee.assignedClass } });
        })
      ).then(function (data2) {
        classes = data2;
      }),
    ]).then((data) => {
      for (let i = 0; i < fees.length; i++) {
        fees[i].assignedClass = classes[i];
        fees[i].assignedStudent = students[i];
      }

      res.status(200).json(fees);
    });

    
  } catch (error) {
    res.status(500).json(error);
  }
};

const createFee = async (req, res) => {
  try {
    // const { name, amount, classes, roll_number } = req.body;
    const { name, amount, classes, students } = req.body;

    const fee = await Fee.create({ name: name, amount: amount });

    if (classes) {
      await Fee.findByIdAndUpdate(fee._id, {
        $push: { assignedClass: classes },
      });
      await Promise.all([
        ...classes.map((cls) => {
          return Student.updateMany(
            { class: cls },
            { $push: { fee: fee._id } }
          );
        }),
      ]);
    }
    // if (roll_number) {
    //   const student = await Student.findOneAndUpdate(
    //     { roll_number: roll_number },
    //     { $push: { fee: fee._id } }
    //   );

    //   await Fee.findByIdAndUpdate(fee._id, {
    //     $push: { assignedStudent: student._id},
    //   });
    // }

    if (students) {
      await Fee.findByIdAndUpdate(fee._id, {
        $push: { assignedStudent: students },
      });

      await Promise.all([
        ...students.map((student) => {
          return Student.findByIdAndUpdate(student, {
            $push: { fee: fee._id },
          });
        }),
      ]);
    }

    res.status(200).json("new fee created successfully");
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
  try {
    const fee = req.params.id;

    await Student.update({}, { $pull: { fee: fee } });

    await Fee.findByIdAndDelete(fee);
    res.status(200).json("Fee Deleted successfully");
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
      }),
    ]);

    res.status(200).send("Fee assigned to classes successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

const FeeRemoveClasses = async (req, res) => {
  try {
    const { classes } = req.body;
    await Fee.findByIdAndUpdate(req.params.id, {
      $pull: { assignedClass: { $in: classes } },
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

    const student = await Student.findOne({ roll_number: roll_number });

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

// async function create(req, res){
//   try {
//     const {name, amount, classes, roll_number} = req.body;

//     const fee = await Fee.create({name: name, amount: amount});

//     if(classes){
//       await Promise.all([
//         ...classes.map((cls) => {
//           return Student.updateMany({ class: cls }, { $push: { fee: fee._id } });
//         }),
//       ]);
//     }
//     if (roll_number) {

//       await Student.updateOne(
//         { roll_number: roll_number },
//         { $push: { fee: fee._id } }
//       );
//     }
//   } catch (error) {
//     res.json(error);
//   }
// }

// try {

//     let classes = [];

//     const fees = await Fee.find({});

//     Promise.all([
//       fees.map((fee) => {
//       return Class.find({_id: {$in: fee.assignedClass}})
//     }),

//     fees.map((fee) => {
//       return Student.find({ _id: { $in: fee.assignedStudent } });
//     })
//   ]).then((data) => {
//       for (let i = 0; i < fees.length; i++){
//         fees[i].assignedClass = data[i];
//       }

//       res.send(fees);
//     })
