const mongoose = require("mongoose");

const connectionDB = (connetion) => {
    mongoose.connect(connetion, () => {
        console.log("connected to database");
    });
}

module.exports = connectionDB;