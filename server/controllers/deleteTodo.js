import todo from '../models/todo.js';

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;

        if (!todoId) {
            return res.status(400).json({
                success: false,
                message: 'Todo ID is required',
            });
        }

        // Find todo first
        const existingTodo = await todo.findById(todoId);

        // Check if todo exists
        if (!existingTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found',
            });
        }

        // Delete todo
        await todo.findByIdAndDelete(todoId);

        // Success response
        return res.status(200).json({
            success: true,
            message: 'Todo deleted successfully',
            todoId: todoId,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
};

export default deleteTodo;