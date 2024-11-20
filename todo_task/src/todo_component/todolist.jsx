import React from "react";
import TodoItem from "./todoitem";

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="todo-list-container">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onDelete={() => onDeleteTodo(todo.id)}
        />
      ))}
    </div>
  );
}

export default TodoList;
