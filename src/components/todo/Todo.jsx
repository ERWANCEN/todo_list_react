import React, { useState } from 'react'

const Todo = () => {
    const [tasks, setTasks] = useState([]);

    return (
        <>
            <h1>ToDo List</h1>
            {tasks.length > 0 && tasks.map((task, index) => (
                <div key={index}>
                    <p>{task}</p>
                </div>
            ))}
        </>
    )
}

export default Todo