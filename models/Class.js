const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
 
    status: { 
        type: String,
        enum: ["Active", "Not Active"],
        default: "Not Active"
    },

    sections: {
        type: Array,
        default: []
    }

    
}, {timestamps: true})

module.exports = mongoose.model("Class", ClassSchema);