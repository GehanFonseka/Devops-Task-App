import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ onNavigateToTasks }) => {
    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
        completionRate: 0
    });

    // Build API base
    const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isCRADev = isLocalHost && window.location.port === '3000';
    const API_BASE = isCRADev ? 'http://localhost:8080' : '';
    const api = axios.create({ baseURL: `${API_BASE}/api` });

    useEffect(() => {
        fetchStats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchStats = async () => {
        try {
            const res = await api.get('/tasks');
            const tasks = res.data || [];
            const completed = tasks.filter(t => t.completed).length;
            const pending = tasks.length - completed;
            const rate = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0;

            setStats({
                total: tasks.length,
                completed,
                pending,
                completionRate: rate
            });
        } catch (e) {
            console.error('Failed to fetch stats:', e);
        }
    };

    const handleNewTask = () => {
        if (onNavigateToTasks) {
            onNavigateToTasks();
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="dashboard-subtitle">Overview of your task management</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card stat-primary">
                    <div className="stat-icon">📋</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">Total Tasks</div>
                    </div>
                </div>

                <div className="stat-card stat-success">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.completed}</div>
                        <div className="stat-label">Completed</div>
                    </div>
                </div>

                <div className="stat-card stat-warning">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.pending}</div>
                        <div className="stat-label">Pending</div>
                    </div>
                </div>

                <div className="stat-card stat-info">
                    <div className="stat-icon">📈</div>
                    <div className="stat-content">
                        <div className="stat-value">{stats.completionRate}%</div>
                        <div className="stat-label">Completion Rate</div>
                    </div>
                </div>
            </div>

            {/* Progress Section */}
            <div className="dashboard-section">
                <div className="section-card">
                    <h2>Progress Overview</h2>
                    <div className="progress-bar-container">
                        <div className="progress-bar-wrapper">
                            <div 
                                className="progress-bar-fill" 
                                style={{ width: `${stats.completionRate}%` }}
                            />
                        </div>
                        <div className="progress-label">
                            {stats.completed} of {stats.total} tasks completed
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-section">
                <h2>Quick Actions</h2>
                <div className="quick-actions-grid">
                    <button className="action-card" onClick={handleNewTask}>
                        <span className="action-icon">➕</span>
                        <span className="action-label">New Task</span>
                    </button>
                    <button className="action-card" onClick={handleNewTask}>
                        <span className="action-icon">📊</span>
                        <span className="action-label">View All Tasks</span>
                    </button>
                    <button className="action-card" onClick={fetchStats}>
                        <span className="action-icon">🔄</span>
                        <span className="action-label">Refresh Stats</span>
                    </button>
                    <button className="action-card" onClick={handleNewTask}>
                        <span className="action-icon">⚡</span>
                        <span className="action-label">Manage Tasks</span>
                    </button>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-section">
                <div className="section-card">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                        <div className="activity-item">
                            <span className="activity-icon success">✓</span>
                            <div className="activity-content">
                                <div className="activity-title">Task completed</div>
                                <div className="activity-time">2 hours ago</div>
                            </div>
                        </div>
                        <div className="activity-item">
                            <span className="activity-icon info">➕</span>
                            <div className="activity-content">
                                <div className="activity-title">New task created</div>
                                <div className="activity-time">5 hours ago</div>
                            </div>
                        </div>
                        <div className="activity-item">
                            <span className="activity-icon warning">✎</span>
                            <div className="activity-content">
                                <div className="activity-title">Task updated</div>
                                <div className="activity-time">1 day ago</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;