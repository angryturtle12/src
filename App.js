import React from 'react';
import TodoList from './TodoList';
import './App.css'; // Import the CSS file

const App = () => {
  return (
    <div className="container"> {/* Apply the "container" CSS class */}
      <h1>To-Do App</h1>
      <TodoList />
    </div>
  );
};

export default App;
