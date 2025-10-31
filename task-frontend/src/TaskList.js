import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import the CSS file (assuming it's named TaskList.css in the same directory)
import './TaskList.css'; 

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                // Ensure your backend is running on http://localhost:8080
                const response = await axios.get('/api/tasks'); 
                setTasks(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []); 

    // --- Render logic with CSS classes ---
    if (loading) {
        return (
            <div className="task-list-container">
                <p className="status-message status-loading">Loading tasks...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="task-list-container">
                <p className="status-message status-error">Error fetsks: {error}</p>
            </div>
        );
    }

    return (
        // Apply the main container class here
        <div className="task-list-container">
            <h1>My Tasksgyuyuvc</h1>
            {/* Apply the list class here */}
            <ul className="task-list">
                {tasks.map(task => (
                    // Apply item class and conditional 'completed' class here
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