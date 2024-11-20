import React from "react";

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-label">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
          className="todo-checkbox"
        />
        <span className="todo-text">{todo.todo}</span>
      </label>
      <button onClick={onDelete} className="delete-todo-btn">
        Delete
      </button>
    </div>
  );
}

export default TodoItem;
