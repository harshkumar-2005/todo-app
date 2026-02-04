import Todo from "../models/todo.js";

const toggleStatus = async (req, res) => {
    if (!req.user) {
        console.log('req.user is undefined!');
        return res.status(401).json({
            success: false,
            message: "Authentication required"
        });
    }

    const { id } = req.params;
    const { userId } = req.user;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Todo id is required"
        });
    }

    try {
    const todo = await Todo.findOne({ _id: id, user: userId });

    if (!todo) {
        return res.status(404).json({
            success: false,
            message: "Todo not found or access denied"
        });
    }

    todo.completed = !todo.completed; // Negation of the completed parameter.
    await todo.save();

    return res.status(200).json({
        success: true,
        message: `Todo marked as ${todo.completed ? "completed" : "pending"}`,
        todo
    });

} catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
}

export default toggleStatus;