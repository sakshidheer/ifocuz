import { Button, TextField, Paper, InputLabel } from '@material-ui/core';
import { useState } from 'react';
import classes from './ProjectForm.module.css';
import { CirclePicker } from 'react-color';

const ProjectForm = (props) => {
    let [name, setName] = useState(props.name);
    let [isNameValid, setIsNameValid] = useState(true);
    let [theme, setTheme] = useState('#ccc');
    const onAddClick = (e) =>{
        props.onAdd({
            name: name,
            theme: theme
        });
        e.stopPropagation();
    }
    return (
        <div className={classes.container} onClick={props.onClose}>
            <Paper className={classes.form} onClick={(e) =>  e.stopPropagation()}>
                <div>Add New Project</div>
                <TextField
                    id="name"
                    label="Name"
                    multiline
                    rowsMax={4}
                    value={name}
                    error={!isNameValid}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => setName(e.target.value)}
                />
                <fieldset className={classes.theme}>
                    <legend>Theme</legend>
                    <CirclePicker 
                        color={theme} 
                        triangle="hide" 
                        className={classes.themepicker} 
                        onChangeComplete={(color, event) => setTheme(color.hex) }/>
                </fieldset>
                <div className={classes.btnContainer}>
                    <Button variant="contained"
                        color="secondary" onClick={onAddClick}>
                        Add Task
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default ProjectForm;