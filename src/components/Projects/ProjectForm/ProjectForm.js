import { TextField } from '@material-ui/core';
import { useState } from 'react';
import classes from './ProjectForm.module.css';
import { CirclePicker } from 'react-color';
import { FormLabel } from '@material-ui/core';

const ProjectForm = () => {
    let [name, setName] = useState(null);
    let [isNameValid, setIsNameValid] = useState(true);
    return (
        <div className={classes.container}>
            <div className={classes.form}>
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
                <FormLabel>Theme</FormLabel>
                <CirclePicker triangle="hide"/>
            </div>

        </div>
    )
}

export default ProjectForm;