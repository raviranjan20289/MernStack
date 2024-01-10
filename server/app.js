require("dotenv").config();
const express = require("express");

const app = express();

const port = 3000;

app.use(express.json());

const errorMiddleware = require("./middleware/error.middleware");

const connectDB = require("./database/connect");

const authRoutes = require("./routes/auth.routes");

const contactusRoutes = require("./routes/contactus.routes");

app.use("/api/v1", authRoutes);

app.use("/api/contact", contactusRoutes);

app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`you are listen on port ${port}`);
  });
});
