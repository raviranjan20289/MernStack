const User = require("../models/user.models");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  try {
    const { Username, Email, Phone, Password } = req.body;

    const userExists = await User.findOne({ Email: Email });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }
    //1st way of doing hash password
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(Password, saltRound);

    const userCreated = await User.create({
      Username,
      Email,
      Phone,
      Password,
    });
    console.log(userCreated);
    res.status(201).json({
      msg: "registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const userExists = await User.findOne({ Email });

    if (!userExists) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // const isPasswordValid = await bcrypt.compare(Password, userExists.Password);

    const isPasswordValid = await userExists.comparePassword(Password);

    if (isPasswordValid) {
      res.status(200).json({
        msg: "login successful",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      res.status(401).json({ mssg: "Invalid Email or Password!!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "internal Server Error" });
  }
};
