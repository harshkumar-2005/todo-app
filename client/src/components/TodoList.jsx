import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Todos</h2>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos yet. Add one above!</p>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
