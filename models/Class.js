const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sections:[
        {
            sectionName:{
                type:String,

            },
            sectionStatus: {
                type: String,
                enum: ["Active", "Not Active"],
                default: "Not Active"
            },

        }
    ],
    status: {
        type: String,
        enum: ["Active", "Not Active"],
        default: "Not Active"
    },
}, {timestamps: true})

module.exports = mongoose.model("Class", ClassSchema);