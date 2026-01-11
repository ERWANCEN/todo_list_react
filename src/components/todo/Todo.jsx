import React, { useEffect, useState } from 'react';
import { TODO_FIELDS } from './TodoFields';

import styles from './Todo.module.css'; 

const Todo = () => {
    // Création d'un state tasks, qui comportera les tâches
    const [tasks, setTasks] = useState(() => {
        // Ici, on récupère les items présents dans le localStorage si il y en a, sinon, nous retournons un tableau vide
        const savedTasks = localStorage.getItem('mes-taches-react');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });
    const [newTask, setNewTask] = useState("");

    // S'active à chaque fois que le tableau tasks est touché.
    // Permet d'ajouter les informations dans le localStorage
    useEffect(() => {
        localStorage.setItem('mes-taches-react', JSON.stringify(tasks));
    }, [tasks]);

    // Méthode qui récupère ce que le user entre dans l'input du form
    const handleChange = (event) => {
        setNewTask(event.target.value);
    };

    // Méthode qui récupère ce que le user a validé dans le form
    const handleSubmit = (event) => {
        // Empêche que la page ne recharge après chaque submit
        event.preventDefault();

        // Sécurité vérifiant que le user n'a pas entré un élément vide
        if (newTask.trim() === "") return;

        //  Complète les données nécessaire à l'implémentation de la tâche dans le tableau
        setTasks(prevTasks => [...prevTasks, { text: newTask, completed: false }]);     
        
        // Réinitialise la variable newTask
        setNewTask("");
    }

    // Méthode qui permet de supprimer un élément de la liste des tâches
    const handleDelete = (indexToDelete) => {
        // .filter() permet de créer un nouveau tableau avec tous les éléments qui ont un id différent que celui sélectionné
        setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexToDelete));
    };

    // Méthode qui permet de modifier l'état completed d'une tâche
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
                {/* Permet l'affichage de toutes les tâches */}
                {tasks.map((task, index) => (
                    <li key={index} className={styles.item}>
                        {/* Partie complétion de la tâche */}
                        <span 
                            onClick={() => handleToggleTask(index)}
                            // Gère la rayure d'un élément de la ToDo
                            className={`${styles.taskText} ${task.completed ? styles.completed : ''}`}
                        >
                            {task.text}
                        </span>
                        
                        {/* Partie suppression de la tâche */}
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