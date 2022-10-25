const User = require("../models/Users");
const bcrypt = require("bcrypt");

const login = async (req, res) => {

  try {
    let { email, password } = req.body;

    if ((email, password)) {
      const user = await User.findOne({ email: email });
      if (user) {
        const checkpassword = await bcrypt.compare(password, user.password);

        if (checkpassword) {
          let { role } = user;

          
          res.status(200).json(user);
        } else {
          res.status(401).send("Password is incorrect");
        }
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(400).send("Please Provide email and password");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;

    if ((name, email, password, role)) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password, role });
      res.status(200).send("User registered successfully");
    } else {
      res
        .status(400)
        .send("Please Provide name, email, password and role of user");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { login, register };
