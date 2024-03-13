const mongoose = require("mongoose");

// Define task schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  priority: String,
  userId: String, // Assuming userId is a string
});

// Create a model from the schema
const Task = mongoose.model("Task", taskSchema);

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/task-management-pwa", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Generate and insert dummy data
const generateData = async () => {
  const dummyTasks = [];

  // Generate 100 dummy tasks
  for (let i = 0; i < 100; i++) {
    const dummyTask = {
      title: `Task ${i + 1}`,
      description: `Description for Task ${i + 1}`,
      dueDate: new Date(), // Set due date as current date
      priority: Math.random() < 0.5 ? "Low" : "High", // Randomly assign priority
      userId: "65e8720ebccb75e34394649a", // Replace with actual user ID
    };
    dummyTasks.push(dummyTask);
  }

  // Insert dummy tasks into the database
  await Task.insertMany(dummyTasks);
  console.log("Dummy data inserted successfully.");
};

// Call the function to generate and insert data
generateData();
