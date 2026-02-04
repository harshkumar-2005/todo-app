import Todo from '../models/todo.js';

const createTodo = async (req, res) => {
    const { title, description } = req.body;
    const { userId } = req.user;

    try {
        // Validate required fields
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        // Create todo
        const todo = await Todo.create({
            title,
            description,
            user: userId, // Use authenticated user's ID
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
