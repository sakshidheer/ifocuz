import TaskForm from '../../components/Task/TaskForm/TaskForm';
import TaskList from '../../components/Task/TaskList/TaskList';
import classes from './Tasks.module.css'

const Task = () => {
    return <div className={classes.container}>
        <TaskForm />
        <TaskList />
        </div>
}

export default Task;