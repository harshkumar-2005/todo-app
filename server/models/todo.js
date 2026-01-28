import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: 3,
            maxlength: 100
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Todo = mongoose.model("Todo", TodoSchema);

export default Todo;
