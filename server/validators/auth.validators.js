const z = require("zod");

// creating an object schema

const signupSchema = z.object({
  Username: z
    .string({ required_error: "Username is requried" })
    .trim()
    .min(3, { mssg: "Username must of atleast 3 chars" })
    .max(50, { mssg: "Username must be less than 50 characters" }),

  Email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(8, { message: "Email must be of atleast 8 chars" })
    .max(50, { message: "Email should not be greater than 50 chars" }),

  Phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone should be of 10 digits" })
    .max(10, { message: "Phone should be less than 11 digits" }),

  Password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(7, { message: "password should be atleast of 7 chars" })
    .max(100, { message: "password should be lesss than 100 chars" }),
});

module.exports = signupSchema;
