import { useLocation } from 'react-router-dom';
import TaskForm from '../../components/Task/TaskForm/TaskForm';
import TaskList from '../../components/Task/TaskList/TaskList';
import classes from './Project.module.css'
import invert from 'invert-color';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const Project = () => {
    let location = useLocation();
    let theme = '#ccc';
    let themeColor;
    if (location && location.state && location.state.id) {
        let projectId = location.state.id;
        theme = location.state.theme;
        themeColor = invert(theme, true)
    }
    const mutheme = createMuiTheme({
        overrides: {
            // Style sheet name
            MuiFormLabel: {
                root: {
                    color: themeColor,
                },
            },
            MuiOutlinedInput: {
                notchedOutline: {
                    borderColor: themeColor
                },
            },
            MuiInputBase:{
                input:{
                    color: themeColor,
                },
                underline:{
                    color:themeColor
                },
            },
            MuiRadio:{
                root:{
                    color: themeColor
                }
            },
            MuiSelect:{
                icon:{
                    color:themeColor
                }
            }
        },
    });
    debugger;
    return (<div
        className={classes.container}
        style={{ '--bgColor': theme, '--color': themeColor }}>
        <ThemeProvider theme={mutheme}>
            <TaskForm />
        </ThemeProvider>

        <TaskList />
    </div>)
}

export default Project;