import { useState } from 'react';
import TaskForm from '../../components/Task/TaskForm/TaskForm';
import TaskList from '../../components/Task/TaskList/TaskList';
import classes from './Tasks.module.css'

const Task = () => {
let [task ,setTask] =useState({});
    const onTaskEdit=(props) =>{
        setTask({
            editMode: true,
            task: props.task,
            finishTime: props.finishTime
        })
    }
    return <div className={classes.container}>
        <TaskForm {...task}/>
        <TaskList onTaskEdit={onTaskEdit}/>
    </div>
}

export default Task;