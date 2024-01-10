const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.Mongo_URI);
    console.log("DB connected ");
  } catch (error) {
    res.status(500).json({ error: "connection to db is failed " });
    process.exit(0);
  }
};

module.exports = connectDB;
