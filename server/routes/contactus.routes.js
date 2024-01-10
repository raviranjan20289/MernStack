const express = require("express");

const router = express.Router();

const contactController = require("../controllers/contactus.controllers");

router.post("/contactus", contactController.contact);

module.exports = router;
