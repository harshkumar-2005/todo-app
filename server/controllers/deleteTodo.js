import todo from '../models/todo.js';

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;
        const { userId } = req.user;

        if (!todoId) {
            return res.status(400).json({
                success: false,
                message: 'Todo ID is required',
            });
        }

        // Find and delete todo in one operation, ensuring it belongs to the user
        const deletedTodo = await todo.findOneAndDelete({ _id: todoId, user: userId });

        // Check if todo was found and deleted
        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found or access denied',
            });
        }

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