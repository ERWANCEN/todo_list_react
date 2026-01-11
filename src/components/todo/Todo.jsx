import React, { useState } from 'react';
import { TODO_FIELDS } from './TodoFields';

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (newTask.trim() === "") return;

        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTask("");
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {tasks.map((t, index) => <li key={index}>{t}</li>)}
                </ul>
                {TODO_FIELDS.map((fields, index) => (
                    <div key={index}>
                        <label htmlFor={fields.id}>{fields.label} : </label>
                        <input
                            type={fields.type}
                            id={fields.id}
                            name={fields.name}
                            placeholder={fields.placeholder}
                            value={newTask}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button>Valider</button>
            </form>
        </>
    )
}

export default Todo