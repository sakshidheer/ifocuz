import { useLocation } from 'react-router-dom';
import TaskForm from '../../components/Task/TaskForm/TaskForm';
import TaskList from '../../components/Task/TaskList/TaskList';
import Task from '../Tasks/Tasks';
import classes from './Project.module.css'

const Project = () => {
    let location = useLocation();
    let theme = '#ccc';
    if (location && location.state && location.state.id)
        theme = location.state.theme;
    return (<div
        className={classes.container}
        style={{ '--bgColor': theme }}>
        <Task/>
    </div>)
}

export default Project;