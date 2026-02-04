import React from "react";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex items-center justify-between ${todo.completed ? "opacity-50" : ""}`}
    >
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold ${todo.completed ? "line-through" : ""}`}
        >
          {todo.title}
        </h3>
        <p className="text-gray-600">{todo.description}</p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggle(todo._id)}
          className={`px-3 py-1 rounded ${todo.completed ? "bg-gray-500 text-white" : "bg-blue-500 text-white"} hover:opacity-80`}
        >
          {todo.completed ? "Mark as Pending" : "Mark as Completed"}
        </button>
        <button
          onClick={() => onDelete(todo._id)}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
