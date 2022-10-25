const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true,
        min:5
    },

    role:{
        type:Number,
        required: true,
        enum:[1, 2, 3]
    }
},
{timestamps: true});

module.exports = mongoose.model("User", UserSchema);