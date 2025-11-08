import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newTitle, setNewTitle] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [filter, setFilter] = useState('all');

    // Build API base once
    const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const isCRADev = isLocalHost && window.location.port === '3000';
    const API_BASE = isCRADev ? 'http://localhost:8080' : '';
    const api = axios.create({ baseURL: `${API_BASE}/api` });

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await api.get('/tasks');
            setTasks(res.data || []);
            setError(null);
        } catch (e) {
            setError(e.message || 'Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        const title = newTitle.trim();
        if (!title) return;
        try {
            const res = await api.post('/tasks', { title, completed: false });
            setTasks(prev => [...prev, res.data]);
            setNewTitle('');
        } catch (e) {
            setError(e.message || 'Failed to add task');
        }
    };

    const startEdit = (task) => {
        setEditingId(task.id);
        setEditingTitle(task.title);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditingTitle('');
    };

    const saveEdit = async (task) => {
        const title = editingTitle.trim();
        if (!title) return;
        try {
            const res = await api.put(`/tasks/${task.id}`, { id: task.id, title, completed: task.completed });
            setTasks(prev => prev.map(t => (t.id === task.id ? res.data : t)));
            cancelEdit();
        } catch (e) {
            setError(e.message || 'Failed to save task');
        }
    };

    const toggleCompleted = async (task) => {
        try {
            const res = await api.put(`/tasks/${task.id}`, { id: task.id, title: task.title, completed: !task.completed });
            setTasks(prev => prev.map(t => (t.id === task.id ? res.data : t)));
        } catch (e) {
            setError(e.message || 'Failed to update task');
        }
    };

    const handleDelete = async (task) => {
        try {
            await api.delete(`/tasks/${task.id}`);
            setTasks(prev => prev.filter(t => t.id !== task.id));
        } catch (e) {
            setError(e.message || 'Failed to delete task');
        }
    };

    const markAllCompleted = async () => {
        try {
            const res = await api.put('/tasks/mark-all-completed');
            setTasks(res.data || []);
        } catch (e) {
            setError(e.message || 'Failed to mark all completed');
        }
    };

    const clearCompleted = async () => {
        try {
            const completedIds = tasks.filter(t => t.completed).map(t => t.id);
            await Promise.all(completedIds.map(id => api.delete(`/tasks/${id}`)));
            setTasks(prev => prev.filter(t => !t.completed));
        } catch (e) {
            setError(e.message || 'Failed to clear completed tasks');
        }
    };

    // Filter tasks
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;

    if (loading) {
        return (
            <div className="task-list-container">
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Loading your tasks...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="task-list-container">
                <div className="error-state">
                    <span className="error-icon">⚠️</span>
                    <h3>Oops! Something went wrong</h3>
                    <p>{error}</p>
                    <button className="btn btn-primary" onClick={fetchTasks}>Try Again</button>
                </div>
            </div>
        );
    }

    return (
        <div className="task-list-container">
            {/* Header Section - SIMPLIFIED */}
            <div className="task-header">
                <div className="header-content">
                    <h1>My Tasks</h1>
                    <p className="task-subtitle">Organize and manage your daily tasks</p>
                </div>
            </div>

            {/* Add Task Form */}
            <div className="add-task-section">
                <form className="add-task-form" onSubmit={handleAdd}>
                    <div className="input-wrapper">
                        <span className="input-icon">➕</span>
                        <input
                            type="text"
                            placeholder="What needs to be done?"
                            className="task-input-modern"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-add">
                        <span className="btn-icon">+</span>
                        Add Task
                    </button>
                </form>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
                <button 
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Tasks <span className="tab-count">{total}</span>
                </button>
                <button 
                    className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active <span className="tab-count">{active}</span>
                </button>
                <button 
                    className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed <span className="tab-count">{completed}</span>
                </button>
            </div>

            {/* Tasks List */}
            {filteredTasks.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">
                        {filter === 'all' && '📝'}
                        {filter === 'active' && '🎯'}
                        {filter === 'completed' && '🎉'}
                    </div>
                    <h3>
                        {filter === 'all' && 'No tasks yet'}
                        {filter === 'active' && 'No active tasks'}
                        {filter === 'completed' && 'No completed tasks'}
                    </h3>
                    <p>
                        {filter === 'all' && 'Create your first task to get started'}
                        {filter === 'active' && 'All tasks are completed! Great job!'}
                        {filter === 'completed' && 'Complete some tasks to see them here'}
                    </p>
                </div>
            ) : (
                <div className="tasks-list">
                    {filteredTasks.map(task => (
                        <div key={task.id} className={`task-card ${task.completed ? 'task-completed' : ''}`}>
                            <div className="task-checkbox-wrapper">
                                <input
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    checked={task.completed}
                                    onChange={() => toggleCompleted(task)}
                                    className="task-checkbox-modern"
                                />
                                <label htmlFor={`task-${task.id}`} className="checkbox-label"></label>
                            </div>

                            <div className="task-content">
                                {editingId === task.id ? (
                                    <input
                                        className="task-edit-input"
                                        value={editingTitle}
                                        onChange={(e) => setEditingTitle(e.target.value)}
                                        onKeyDown={(e) => { 
                                            if (e.key === 'Enter') saveEdit(task); 
                                            if (e.key === 'Escape') cancelEdit(); 
                                        }}
                                        autoFocus
                                    />
                                ) : (
                                    <span className="task-text">{task.title}</span>
                                )}
                            </div>

                            <div className="task-actions-modern">
                                {editingId === task.id ? (
                                    <>
                                        <button 
                                            className="action-btn action-save" 
                                            onClick={() => saveEdit(task)}
                                            title="Save"
                                        >
                                            ✓
                                        </button>
                                        <button 
                                            className="action-btn action-cancel" 
                                            onClick={cancelEdit}
                                            title="Cancel"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button 
                                            className="action-btn action-edit" 
                                            onClick={() => startEdit(task)}
                                            title="Edit task"
                                        >
                                            ✎
                                        </button>
                                        <button 
                                            className="action-btn action-delete" 
                                            onClick={() => handleDelete(task)}
                                            title="Delete task"
                                        >
                                            🗑️
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Bulk Actions */}
            {total > 0 && (
                <div className="bulk-actions">
                    <button 
                        className="bulk-btn"
                        onClick={markAllCompleted}
                        disabled={completed === total}
                    >
                        <span className="bulk-icon">✓</span>
                        Mark All Complete
                    </button>
                    <button 
                        className="bulk-btn bulk-clear"
                        onClick={clearCompleted}
                        disabled={completed === 0}
                    >
                        <span className="bulk-icon">🗑️</span>
                        Clear Completed
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskList;
