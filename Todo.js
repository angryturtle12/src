import React, { useState } from 'react';

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
    const { id, task, completed, dueDate, priority, subtasks } = todo;
    const [newSubtask, setNewSubtask] = useState('');

    const handleSubtaskInputChange = (event) => {
        setNewSubtask(event.target.value);
    };

    const handleSubtaskSubmit = (event) => {
        event.preventDefault();

        if (newSubtask.trim() !== '') {
            const subtask = {
                id: Date.now(),
                task: newSubtask,
                completed: false,
            };

            todo.subtasks.push(subtask);
            setNewSubtask('');
        }
    };

    const handleSubtaskToggleComplete = (subtaskId) => {
        todo.subtasks.forEach((subtask) => {
            if (subtask.id === subtaskId) {
                subtask.completed = !subtask.completed;
            }
        });
    };

    const handleSubtaskDelete = (subtaskId) => {
        const updatedSubtasks = todo.subtasks.filter(
            (subtask) => subtask.id !== subtaskId
        );
        todo.subtasks = updatedSubtasks;
    };

    return (
        <div>
            <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleComplete(id)}
            />
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                {task}
            </span>
            {dueDate && (
                <span style={{ marginLeft: '10px' }}>Due: {dueDate}</span>
            )}
            {priority && (
                <span style={{ marginLeft: '10px' }}>Priority: {priority}</span>
            )}
            <ul>
                {subtasks &&
                    subtasks.map((subtask) => (
                        <li key={subtask.id}>
                            <input
                                type="checkbox"
                                checked={subtask.completed}
                                onChange={() => handleSubtaskToggleComplete(subtask.id)}
                            />
                            <span
                                style={{
                                    textDecoration: subtask.completed ? 'line-through' : 'none',
                                }}
                            >
                                {subtask.task}
                            </span>
                            <button onClick={() => handleSubtaskDelete(subtask.id)}>
                                Delete Subtask
                            </button>
                        </li>
                    ))}
            </ul>
            <form onSubmit={handleSubtaskSubmit}>
                <input
                    type="text"
                    value={newSubtask}
                    onChange={handleSubtaskInputChange}
                    placeholder="Add subtask"
                />
                <button type="submit">Add Subtask</button>
            </form>
            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    );
};

export default Todo;
