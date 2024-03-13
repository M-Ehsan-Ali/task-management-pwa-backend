const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (userId) {
        const user = await mongoose.model("User").findById(userId);
        return user !== null;
      },
      message: (props) => `${props.value} is not a valid user ID`,
    },
  },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
});

module.exports = mongoose.model("Task", taskSchema);
