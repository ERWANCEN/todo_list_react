import React, { useEffect, useState } from 'react';
import { TODO_FIELDS } from './TodoFields';

import styles from './Todo.module.css'; 

const Todo = () => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('mes-taches-react');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem('mes-taches-react', JSON.stringify(tasks));
    }, [tasks]);

    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newTask.trim() === "") return;
        setTasks(prevTasks => [...prevTasks, { text: newTask, completed: false }]);        
        setNewTask("");
    }

    const handleDelete = (indexToDelete) => {
        setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToDelete));
    };

    const handleToggleTask = (indexToToggle) => {
        setTasks(prevTasks => 
            prevTasks.map((task, index) => {
                if (index === indexToToggle) {
                    return { ...task, completed: !task.completed };
                }
                return task;
            })
        );
    };

    return (
        <div className={styles.container}>
            <ul className={styles.list}>
                {tasks.map((task, index) => (
                    <li key={index} className={styles.item}>
                        <span 
                            onClick={() => handleToggleTask(index)}
                            className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}
                        >
                            {task.text}
                        </span>
                        
                        <span 
                            onClick={() => handleDelete(index)}
                            className={styles.deleteBtn}
                            title="Supprimer"
                        >
                            🗑️
                        </span>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className={styles.formGroup}>
                {TODO_FIELDS.map((fields, index) => (
                    // Note: React.Fragment (<>) est utile ici si vous aviez plusieurs éléments
                    <div key={index}> 
                        <input
                            className={styles.input}
                            type={fields.type}
                            id={fields.id}
                            name={fields.name}
                            placeholder={fields.placeholder}
                            value={newTask}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit" className={styles.button}>Valider</button>
            </form>
        </div>
    )
}

export default Todo