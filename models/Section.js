const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Active", "Not Active"],
        default: "Not Active"
    }
},
{timestamps: true});

module.exports = mongoose.model("Section", SectionSchema);