const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    student_name: {
      type: String,
      required: true,
      minLength: [3, "Name should be at least 3 characters"],
      maxLength: [25, "Name should not be greater than 25 characters"],
    },

    father_name: {
      type: String,
      required: true,
      minLength: [3, "Name should be at least 3 characters"],
      maxLength: [25, "Name should not be greater than 25 characters"],
    },

    student_image: {
      type: String,
      required: true,
      default: "",
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section"
    },

    B_form: {
      type: String,
    },

    Father_CNIC: {
      type: String,
      required: true,
      minLength: [13, "CNIC should be 13 digits long"],
      maxLength: [13, "CNIC should be 13 digits long"],
    },

    email: {
      type: String,
    },

    address: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
      default: "Pakistan",
    },

    city: {
      type: String,
      required: true,
    },

    province: {
      type: String,
      required: true,
      default: "Punjab",
    },

    father_profession: {
      type: String,
    },

    father_qualification: {
      type: String,
    },

    mother_qualification: {
      type: String,
    },

    father_number: {
      type: Number,
      required: true,
      minLength: [10, "Number should be 10 digits long without starting zero"],
      maxLength: [10, "Number should be 10 digits long without starting zero"],
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    religion: {
      type: String,
      required: true,
      enum: ["Islam", "Hindu", "Christian"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);