import React, { useState } from 'react';
import Todo from './Todo';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newPriority, setNewPriority] = useState('');
    const [newSubtask, setNewSubtask] = useState('');
    const [newReminder, setNewReminder] = useState('');

    const toggleComplete = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    };

    const handleTaskInputChange = (event) => {
        setNewTask(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setNewPriority(event.target.value);
    };

    const handleSubtaskInputChange = (event) => {
        setNewSubtask(event.target.value);
    };

    const handleReminderChange = (event) => {
        setNewReminder(event.target.value);
    };

    const handleSubtaskSubmit = (event, todoId) => {
        event.preventDefault();

        if (newSubtask.trim() !== '') {
            setTodos((prevTodos) =>
                prevTodos.map((todo) => {
                    if (todo.id === todoId) {
                        const newSubtask = {
                            id: Date.now(),
                            // eslint-disable-next-line no-use-before-define
                            task: newSubtask,
                            completed: false,
                        };
                        todo.subtasks.push(newSubtask);
                    }
                    return todo;
                })
            );

            setNewSubtask('');
        }
    };

    return (
        <div>
            <h2>To-Do App</h2>
            <form className="todo-form">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Enter a new task"
                    value={newTask}
                    onChange={handleTaskInputChange}
                />
                <select
                    className="priority-select"
                    value={newPriority}
                    onChange={handlePriorityChange}
                >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
                <input
                    type="datetime-local"
                    className="reminder-input"
                    value={newReminder}
                    onChange={handleReminderChange}
                />
                <button
                    className="todo-button"
                    onClick={() => {
                        if (newTask.trim() !== '') {
                            const newTodo = {
                                id: Date.now(),
                                task: newTask,
                                completed: false,
                                priority: newPriority,
                                subtasks: [],
                                reminder: newReminder,
                            };
                            setTodos([...todos, newTodo]);
                            setNewTask('');
                            setNewPriority('');
                            setNewReminder('');
                        }
                    }}
                >
                    Add Task
                </button>
            </form>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        newSubtask={newSubtask}
                        setNewSubtask={setNewSubtask}
                        handleSubtaskInputChange={handleSubtaskInputChange}
                        handleSubtaskSubmit={handleSubtaskSubmit}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
