import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please enter a title for the todo"],
        maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please enter a description for the todo"],
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
