const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controllers");

const signupSchema = require("../validators/auth.validators");

const validate = require("../middleware/validators.middleware");

router.post("/register", validate(signupSchema), authController.register);

router.post("/login", authController.login);

module.exports = router;
