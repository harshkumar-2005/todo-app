import Todo from "../models/todo.js";

const toggleStatus = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Todo id is required"
        });
    }

    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            });
        }

        todo.completed = !todo.completed;
        await todo.save();

        return res.status(200).json({
            success: true,
            message: `Todo marked as ${todo.completed ? "done" : "undone"}`,
            todo
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default toggleStatus;