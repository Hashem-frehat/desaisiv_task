import React, { useState, useEffect } from "react";
import TodoList from "./todo_component/todolist";
import TodoInput from "./todo_component/todoinput";
import "./App.css";

function Maintodo() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTodos, setTotalTodos] = useState(0);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        const response = await fetch(
          `https://dummyjson.com/todos?limit=${ITEMS_PER_PAGE}&skip=${skip}`
        );
        const data = await response.json();
        setTodos(data.todos);
        setTotalTodos(data.total);
      } catch (error) {
        console.log("Failed to load todos");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [currentPage]);

  const addTodo = async (text) => {
    try {
      const response = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: text,
          completed: false,
          userId: 5,
        }),
      });
      const data = await response.json();
      setTodos((prevTodos) => [data, ...prevTodos]);
    } catch (error) {
      console.log("Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find((todo) => todo.id === id);
      const response = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          completed: !todoToUpdate.completed,
        }),
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (error) {
      console.log("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log("Failed to delete todo");
    }
  };

  const addRandomTodo = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos/random");
      const data = await response.json();
      setTodos((prevTodos) => [data, ...prevTodos]);
    } catch (error) {
      console.log("Failed to add random todo");
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalTodos / ITEMS_PER_PAGE);

  return (
    <div className="app-container">
      <h1>Todo Application</h1>

      <div className="controls">
        <TodoInput onAddTodo={addTodo} />
        <button onClick={addRandomTodo} className="random-todo-btn">
          Add Random Todo
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading todos...</div>
      ) : (
        <>
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
          />

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              Previous
            </button>

            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Maintodo;
