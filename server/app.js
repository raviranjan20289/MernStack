require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

const errorMiddleware = require("./middleware/error.middleware");

const connectDB = require("./database/connect");

const authRoutes = require("./routes/auth.routes");

const contactusRoutes = require("./routes/contactus.routes");

app.use(express.json());

app.use("/api/v1", authRoutes);

app.use("/api/contact", contactusRoutes);

app.use(errorMiddleware);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`you are listen on port ${port}`);
  });
});
