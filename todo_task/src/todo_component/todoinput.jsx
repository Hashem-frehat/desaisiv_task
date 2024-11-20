import React, { useState } from 'react';

function TodoInput({ onAddTodo }) {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onAddTodo(inputText);
      setInputText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-container">
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Enter a new todo"
        className="todo-input"
      />
      <button type="submit" className="add-todo-btn">
        Add Todo
      </button>
    </form>
  );
}

export default TodoInput;