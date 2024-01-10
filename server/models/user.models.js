const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  Username: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Phone: {
    type: Number,
    required: true,
  },

  Password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("Password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.Password, saltRound);
    user.Password = hash_password;
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

userSchema.methods.comparePassword = async function (Password) {
  return bcrypt.compare(Password, this.Password);
};

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    {
      userId: this._id.toString(),
      email: this.Email,
      isAdmin: this.isAdmin,
    },
    process.env.Secret_key,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = mongoose.model("User", userSchema);
