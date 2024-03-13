// index.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"], // Add the HTTP methods your frontend uses
  allowedHeaders: ["Content-Type", "Authorization"], // Add the headers your frontend sends
};
app.use(cors(corsOptions));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/task-management-pwa", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

const taskRouter = require("./routes/tasks");
app.use("/api/tasks", taskRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
