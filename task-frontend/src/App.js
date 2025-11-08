import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Settings from './Settings';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  // Changed: Default to 'dashboard' instead of 'tasks'
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Set active tab to dashboard on mount
  useEffect(() => {
    setActiveTab('dashboard');
  }, []);

  const navigateToTasks = () => {
    setActiveTab('tasks');
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigateToTasks={navigateToTasks} />;
      case 'tasks':
        return <TaskList />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigateToTasks={navigateToTasks} />;
        // Changed: Default to Dashboard
    }
  };

  return (
    <div className="app-bg">
      <div className="blob b1" />
      <div className="blob b2" />
      <div className="blob b3" />

      {/* Professional Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo/Brand - Left Aligned */}
          <div className="brand-section">
            <button 
              className="mobile-menu-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle menu"
            >
              <span className="hamburger-icon">☰</span>
            </button>
            <div className="brand" onClick={() => setActiveTab('dashboard')}>
              Task<span className="dot">Pro</span>
            </div>
          </div>

          {/* Navigation Links - Center */}
          <div className={`nav-links ${sidebarOpen ? 'open' : ''}`}>
            <button
              className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </button>
            <button
              className={`nav-link ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => { setActiveTab('tasks'); setSidebarOpen(false); }}
            >
              <span className="nav-icon">✓</span>
              <span className="nav-text">Tasks</span>
            </button>
            <button
              className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
            >
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </button>
            <button
              className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}
            >
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Settings</span>
            </button>
          </div>

          {/* User Actions - Right Side */}
          <div className="user-actions">
            <button className="notification-btn" aria-label="Notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-avatar">
              <img 
                src="https://ui-avatars.com/api/?name=User&background=38bdf8&color=fff&size=40" 
                alt="User" 
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="content-wrap">
        {renderContent()}
      </main>

      {/* Professional Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <div className="footer-brand">
              Task<span className="highlight">Pro</span>
            </div>
            <p className="footer-description">
              A modern, professional task management application built with React and Spring Boot. 
              Streamline your workflow and boost productivity.
            </p>
            <div className="social-links">
              <a href="#github" className="social-link" aria-label="GitHub">
                <span>⚡</span>
              </a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
              <a href="#twitter" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <a href="#features" className="footer-link">Features</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#about" className="footer-link">About Us</a>
            <a href="#contact" className="footer-link">Contact</a>
          </div>

          {/* Resources */}
          <div className="footer-section">
            <h3>Resources</h3>
            <a href="#docs" className="footer-link">Documentation</a>
            <a href="#api" className="footer-link">API Reference</a>
            <a href="#support" className="footer-link">Support</a>
            <a href="#blog" className="footer-link">Blog</a>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              2025 TaskPro. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="mobile-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
