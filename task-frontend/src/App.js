import React from 'react';
import TaskList from './TaskList';
import './App.css';

function App() {
  return (
    <div className="app-bg">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      <nav className="navbar">
        <div className="brand">Task<span className="dot">Pro</span></div>
      </nav>

      <main className="content-wrap">
        <TaskList />
      </main>

      <div className="footer">Built with React + Spring Boot ✨</div>
    </div>
  );
}

export default App;
