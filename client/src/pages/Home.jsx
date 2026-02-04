import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    } else if (!loading && user) {
      fetchTodos();
    }
  }, [user, loading, navigate]);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(
        "https://todo-app-0iqg.onrender.com/v1/api/todo/get/all/todos",
        { withCredentials: true },
      );
      setTodos(res.data.todos);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const addTodo = async (title, description) => {
    try {
      const res = await axios.post(
        "https://todo-app-0iqg.onrender.com/v1/api/todo/create",
        { title, description },
        { withCredentials: true },
      );
      setTodos([...todos, res.data.todo]);
    } catch (error) {
      console.error("Failed to add todo", error);
    }
  };

  const toggleTodo = async (id) => {
    try {
      await axios.patch(
        `https://todo-app-0iqg.onrender.com/v1/api/todo/toggle/status/${id}`,
        {},
        { withCredentials: true },
      );
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(
        `https://todo-app-0iqg.onrender.com/v1/api/todo/${id}`,
        {
          withCredentials: true,
        },
      );
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Failed to delete todo", error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Todo App</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>
      <div className="max-w-4xl mx-auto p-4">
        <AddTodo onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </div>
  );
};

export default Home;
