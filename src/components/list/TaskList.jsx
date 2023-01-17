import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { addTask, getTasks, toggleComplete } from '../../firebase/taskController';
import { async } from '@firebase/util';

/**
 * Componente que gestiona la lista de tareas
 *
 * @returns {React.Component}
 *
 */

const TaskList = ({ showSettings, setshowSettings}) => {
    const [newTask, setNewTask] = useState('');
    const [tasklist, setTasklist] = useState([]);

    useEffect(() => {
        getTasks()
            .then((tasks) => setTasklist([...tasks]))
            .catch((e) => console.error(e));
    }, []);
    

/**
* Añade una nueva tarea a la lista
* v2: La nueva tarea se añade como un objeto
* { task: nombre de la tarea, completed: si está completada o no}
*/

const addNewTask = () => {
    if(newTask === "") return;
    const task = { task: newTask, completed:false };
    addTask(task)
        .then(() => {
            setTasklist([...tasklist, task])
        })
        .catch(e => console.error(e))
        .finally(() => setNewTask(''))

    return true;
};

/**
* Función para chequear si la lista de tareas está vacía
* @returns true si tasklist.length === 0
*/
const isTasksEmpty = () => tasklist.length === 0;

/**
* Editar el nombre de la nueva tarea
* @param {*} e - Evento de onChange proveniente de React
*/

const editNewItem = (e) => setNewTask(e.target.value);

/**
* Función para eliminar una tarea en concreto
* @param {*} index - Índice de la tarea a eliminar
*/

const removeItem = (index) => {
    const newtasklist = tasklist.filter((t, i) => i !== index);
    setTasklist(newtasklist);
};

/**
* Cambia el item por completado <-> pendiente
* @param {*} index
*/

const toggleCompleteItem = (index) => {
    let task = tasklist.find(t => t.id === index);
    toggleComplete(task)
        .then(async () => {
            const newTaskList = await getTasks();
            return setTasklist([
                ...newTaskList
            ])
        })
        .catch((e) => console.error(e))
};

/**
* Añade una nueva tarea cuando se presiona la tecla Enter
* @param {*} e - Evento onKeyDown que proviene por defecto de React
*/

const insertNewItemOnEnterKey = (e) => e.key === 'Enter' && addNewTask();
return (
    <>
    <header className="flex justify-between">
        <h1 className="title mt-4 mb-0" >Task List V3</h1>
        <motion.button 
            whileHover={{ scale:1.05 }}
            className="btn-settings py-1 px-3"
            onClick={() => setshowSettings(!showSettings)}>{!showSettings ? "Settings" : "Hide"}</motion.button>
    </header>
    <div className="my-4">
        <input
            className="input shadow py-1 px-2 rounded-lg outline-none transition-all duration-300 focus:ring-1 mr-2 dark:bg-slate-200 dark:text-slate-900"
            value={newTask}
            onKeyDown={insertNewItemOnEnterKey}
            onChange={editNewItem}
            placeholder="New Task"
            type="text"
        />
        <button type="button" className="btn" onClick={addNewTask}>
            Create Task
        </button>
    </div>
    {isTasksEmpty() ? (
        <p>Task List is Empty</p>
        ) : (
        <ul className="todo-list">
            {tasklist.map((item, index) => (
                <motion.li initial={{ x: "100vw" }} animate={{ x: 0 }} key={index}>
                <label className="cursor-pointer">
                    <input
                        type="checkbox"
                        // onClick={() => removeItem(index)}
                        onClick={() => toggleCompleteItem(item.id)}
                        checked={item.completed}
                        onChange={() => {}}
                    />
                    <span
                        className={`ml-2 text-gray-800 dark:text-gray-100 text-sm italic ${
                            item.completed && "line-through"
                        }`}
                    >
                        {item.task}
                    </span>
                </label>
                </motion.li>
            ))}
        </ul>
        )}
    </>
    );
};

export default TaskList;