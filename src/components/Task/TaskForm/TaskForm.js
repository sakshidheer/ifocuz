import React, { useState } from 'react';
import classes from './TaskForm.module.css';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import database from '../../../database';
import { RadioGroup, Radio, Button, FormControlLabel, TextField, InputLabel, FormControl, Select } from '@material-ui/core';
import {
    DateTimePicker, MuiPickersUtilsProvider

} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { useLiveQuery } from "dexie-react-hooks";

const TaskForm = (props) => {
    let [task, setTask] = useState('');
    let [finishTime, setFinishTime] = useState(new Date());
    let [priority, setPriority] = useState(Object.entries(props.priorities)[0][0]);
    let [label, setLabel] = useState(props.labels[0].value);
    let [taskValid, setTaskValid] = useState(true);
    let [finishDateValid, setFinishDateValid] = useState(true);
    let projects = useLiveQuery(() => {
        return database.projects.toArray();
    });
    let [project, setProject] = useState(projects ? projects[0] : '');

    const resetForm = () => {
        setTask('')
        setFinishTime(new Date());
        setPriority(Object.entries(props.priorities)[0][0])
        setLabel(props.labels[0].value)
    }

    const isFormValid = () => {
        if (task === '') {
            setTaskValid(false);
            return false;
        }
        setTaskValid(true);
        if (finishTime === '') {
            setFinishDateValid(false);
            return false;
        }
        setFinishDateValid(true);

        return true;
    }

    const addTask = () => {
        let isValid = isFormValid();
        if (!isValid)
            return;
        database.todolist.add({
            id: v4(),
            task: task,
            finishTime: finishTime,
            priority: priority,
            label: label,
            status: 0
        });
        resetForm();
    };
    const onPriorityChange = (e) => {
        setPriority(e.target.value);
    }
    let radioButtons = Object.entries(props.priorities).map(item => {
        let [key, value] = item;
        return <FormControlLabel
            value={key}
            key={key}
            control={<Radio />}
            style={{ '--labelColor': value }}
            label={key}
            className={classes.radioButton} />
    });
    let labelItem = props.labels.map(item => {
        return <option
            value={item.value}
            key={item.value}>{item.displayName}</option>;
    })
    let projectItems = null;
    if (projects != null)
        projectItems = projects.map(item => {
            return <option
                value={item.id}
                key={item.id}>{item.name}</option>;
        })
    return <div className={classes.taskform}>
        <TextField
            id="task"
            label="Task"
            multiline
            rowsMax={4}
            value={task}
            error={!taskValid}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
                shrink: true,
            }}
            onChange={(e) => setTask(e.target.value)}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
                label="Finish Time"
                value={finishTime}
                error={!finishDateValid}
                minDate={new Date()}
                fullWidth
                onChange={(value) => setFinishTime(value)}
            />
        </MuiPickersUtilsProvider>
        <div style={{ padding: '10px' }}></div>

        <InputLabel margin='dense' variant="outlined" shrink>Priority</InputLabel>
        <RadioGroup
            aria-label="priority"
            name="priority"
            value={priority}
            onChange={onPriorityChange} row>
            {radioButtons}
        </RadioGroup>
        
        <FormControl
            fullWidth
            variant="outlined"
            margin="normal">
            <InputLabel htmlFor="outlined-label-native-simple">Label</InputLabel>
            <Select
                native
                label="label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            >
                {labelItem}
            </Select>
        </FormControl>
        <div style={{ padding: '10px' }}></div>
        <FormControl
            fullWidth
            variant="outlined">
            <InputLabel shrink htmlFor="outlined-project-native-simple">Project</InputLabel>
            <Select
                native
                margin="normal"
                id="outlined-project-native-simple"
                label="project"
                value={project}
                onChange={(e) => setLabel(e.target.value)}
            >
                {projectItems}
            </Select>
        </FormControl>
        <div className={classes.addContainer}>
            <Button variant="contained" color="secondary" onClick={addTask}>
                Add Task
        </Button>
        </div>

    </div>
};



const mapStateToProps = state => {
    return {
        priorities: state.priorities,
        labels: state.labels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddTask: (task) => dispatch({ type: 'ADD_TASK', task: task })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);