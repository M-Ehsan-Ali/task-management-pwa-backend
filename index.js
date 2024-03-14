const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());

// CORS configuration
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://mrehsan51:aCehPuBDndF9VkwW@cluster0.2inetw9.mongodb.net/task-management-pwa",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      socketTimeoutMS: 30000,
    }
  )
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
