import Todo from "../models/todo.js";

const getAllTodo = async (req, res) => {
    try {
        const { userId } = req.user; // This is set by the middleware.

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const allTodo = await Todo.find({ user: userId })
            .select("_id title description completed");

        if (allTodo.length === 0) {
            return res.status(404).json({
                success: true,
                message: "No Todo is present."
            });
        }

        res.status(200).json({
            success: true,
            todos: allTodo
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default getAllTodo;
