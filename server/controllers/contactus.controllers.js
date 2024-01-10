const Contact = require("../models/contactus.models");
exports.contact = async (req, res) => {
  try {
    const response = req.body;
    const result = await Contact.create(response);
    res.status(201).json({ mssg: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
