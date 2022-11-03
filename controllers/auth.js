const User = require("../models/Users");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    if(!(email, password))
    {
      return res.status(401).send("Please Enter Valid Cradiantials")

    }
    const user = await User.findOne({ email: email });
    if(!user)
    {
      return res.status(401).send("Try to Login with correct crediantials")
    }
    const checkpassword = await bcrypt.compare(password, user.password);
    if(!checkpassword)
      {
        return res.status(401).send("Try to Login with correct crediantials")
      }
    res.status(200).send(user)  

  } catch (error) {
    res.status(500).send(error);
  }
};

const register = async (req, res) => {
  try {
    let { name, email, password, role } = req.body;
    let olduser =await User.findOne({email:req.body.email})
            
    if(olduser)
    {
        // if user whith same email exist then returm error message
        return res.status(400).json({success:false,error:"sorry a user with this email is already exist"})
    }
    if ((name, email, password, role)) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const user = await User.create({ name, email, password, role });
      res.status(200).send({success:true, user});
    } else {
      res
        .status(400)
        .send( {success:false,error:"sorry a user with this email is already exist"});
    }
  } catch (error) {
    res.status(500).json({success:false, error:error});
  }
};

module.exports = { login, register };
