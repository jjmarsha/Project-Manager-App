import React from 'react';
import logo from './logo.svg';
import './App.css';
import TodoList from './todoList';
import Login from './components/Login/login';

function App() {
  return (
    <div className="App">
      <TodoList/>
      <Login />
    </div>
  );
}


export default App;
