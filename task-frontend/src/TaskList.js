import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskList.css';

const TaskList = () => {
    // State to store our list of tasks
    const [tasks, setTasks] = useState([]);
    // State to handle loading
    const [loading, setLoading] = useState(true);
    // State to handle errors
    const [error, setError] = useState(null);

    // This useEffect hook runs once when the component mounts
    useEffect(() => {
        // Define the function to fetch data
        const fetchTasks = async () => {
            try {
                // Build API base:
                // - If running CRA dev server (port 3000), call backend at localhost:8080
                // - Otherwise (Docker/Nginx on port 80/other), use same-origin so Nginx proxies /api
                const isLocalHost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const isCRADev = isLocalHost && window.location.port === '3000';
                const API_BASE = isCRADev ? 'http://localhost:8080' : '';
                // Make the GET request to our Spring Boot API
                const response = await axios.get(`${API_BASE}/api/tasks`);
                // On success, update the tasks state
                setTasks(response.data);
            } catch (err) {
                // On failure, update the error state
                setError(err.message);
            } finally {
                // In any case, stop loading
                setLoading(false);
            }
        };

        // Call the fetch function
        fetchTasks();
    }, []); // The empty array [] means this effect runs only once on mount

    // --- Render logic ---
    if (loading) {
        return <div className="status-message status-loading">Loading tasks...</div>;
    }

    if (error) {
        return <div className="status-message status-error">Error fetching tasks: {error}</div>;
    }

    return (
        <div className="task-list-container">
            <h1>My Tasks</h1>
            <ul className="task-list">
                {tasks.map(task => (
                    <li
                        key={task.id}
                        className={`task-item ${task.completed ? 'completed' : ''}`}
                    >
                        {task.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
