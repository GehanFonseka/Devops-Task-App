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

    if (loading) return <div className="status-message status-loading">Loading tasks...</div>;
    if (error) return <div className="status-message status-error">Error: {error}</div>;

        const total = tasks.length;
        const done = tasks.filter(t => t.completed).length;

    return (
        <div className="task-list-container">
                <div className="card-header">
                    <div>
                        <h1>My Tasks</h1>
                        <div className="subtitle">{done}/{total} completed</div>
                    </div>
                </div>

            <form className="task-toolbar" onSubmit={handleAdd}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    className="task-input"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                />
                        <button type="submit" className="btn btn-primary">Add</button>
                <div className="spacer" />
                <button type="button" className="btn btn-secondary" onClick={markAllCompleted}>
                    Mark all completed
                </button>
            </form>

            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleCompleted(task)}
                            className="task-checkbox"
                        />
                        {editingId === task.id ? (
                            <input
                                className="task-input-inline"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                onKeyDown={(e) => { if (e.key === 'Enter') saveEdit(task); if (e.key === 'Escape') cancelEdit(); }}
                                autoFocus
                            />
                        ) : (
                            <span className="task-title">{task.title}</span>
                        )}

                        <div className="task-actions">
                            {editingId === task.id ? (
                                <>
                                    <button className="btn btn-primary btn-sm" type="button" onClick={() => saveEdit(task)}>Save</button>
                                    <button className="btn btn-light btn-sm" type="button" onClick={cancelEdit}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button className="btn btn-light btn-sm" type="button" onClick={() => startEdit(task)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(task)}>Delete</button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
