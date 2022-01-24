import { useLocation } from 'react-router-dom';
import TaskForm from '../../components/Task/TaskForm/TaskForm';
import TaskList from '../../components/Task/TaskList/TaskList';
import classes from './Project.module.css'
import invert from 'invert-color';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const Project = () => {
    let location = useLocation();
    let theme = '#ccc';
    if (location && location.state && location.state.id)
        theme = location.state.theme;
    return (<div
        className={classes.container}
        style={{ '--bgColor': theme }}>
        <TaskForm />
        <TaskList />
    </div>)
}

export default Project;