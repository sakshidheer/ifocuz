import { Button, TextField, Paper, InputLabel } from '@material-ui/core';
import { useState } from 'react';
import classes from './ProjectForm.module.css';
import { CirclePicker } from 'react-color';
import db from '../../../database';
import { v4 } from 'uuid';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProjectForm = (props) => {
    let [name, setName] = useState(props.id ? props.name : '');
    let [isNameValid, setIsNameValid] = useState(true);
    let [theme, setTheme] = useState(props.id ? props.theme : '#ccc');
    let history = useHistory();
    let text = props.id ? 'Edit' : 'Add';
    const onAddClick = (e) => {
        if (props.id) {
            db.projects.
                update(props.id, { name: name, theme: theme })
                .then(function () {
                    props.onAdd();
                    history.replace(name,{
                        id: props.id,
                        theme: theme,
                        name: name
                    });
                });
        }
        else
            db.projects.add({
                id: v4(),
                name: name,
                theme: theme
            });
        props.onAdd();
        e.stopPropagation();
    }
    return (
        <div className={classes.container} onClick={props.onClose}>
            <Paper className={classes.form} onClick={(e) => e.stopPropagation()}>
                <div>{text} New Project</div>
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
                        onChangeComplete={(color, event) => setTheme(color.hex)} />
                </fieldset>
                <div className={classes.btnContainer}>
                    <Button variant="contained"
                        color="secondary" onClick={onAddClick}>
                        {text} Task
                    </Button>
                </div>
            </Paper>
        </div>
    )
}

export default ProjectForm;