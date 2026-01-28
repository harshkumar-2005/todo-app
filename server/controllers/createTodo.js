import Todo from '../models/todo.js';
import mongoose from 'mongoose';

const createTodo = async (req, res) => {
    const { title, description, userId } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid User ID'
            });
        }

        // Validate required fields
        if (!title || !userId) {
            return res.status(400).json({
                success: false,
                message: 'Title and User ID are required'
            });
        }

        // Create todo
        const todo = await Todo.create({
            title,
            description,
            user: userId, // correct field mapping
        });

        // Success response
        return res.status(201).json({
            success: true,
            message: 'Todo created successfully',
            todo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

export default createTodo;
