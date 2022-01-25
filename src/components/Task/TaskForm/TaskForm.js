import React, { useState } from 'react';
import classes from './TaskForm.module.css';
import { connect } from 'react-redux';
import { v4 } from 'uuid';
import database from '../../../database';
import { Button, TextField } from '@material-ui/core';
import {
    DateTimePicker, MuiPickersUtilsProvider

} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'

import PriorityButtons from './PriorityButtons/PriorityButtons';
import ProjectButtons from './Projects/Projects';
import Labels from './Labels/Labels';
import { useEffect } from 'react';

const TaskForm = (props) => {
    let [task, setTask] = useState('');
    let [finishTime, setFinishTime] = useState(new Date());
    let [priority, setPriority] = useState(Object.entries(props.priorities)[0][0]);
    let [label, setLabel] = useState(props.labels[0].value);
    let [taskValid, setTaskValid] = useState(true);
    let [finishDateValid, setFinishDateValid] = useState(true);

    let [project, setProject] = useState('');
    useEffect(() => {
            setTask(props.task);
            setFinishTime(props.finishTime);
    }, [props])
    const onProjectChange = (e) => {
        setProject(e.target.value)
    }
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
            status: 0,
            project: project
        });
        resetForm();
    };
    const onPriorityChange = (e) => {
        setPriority(e.target.value);
    }

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
                
                fullWidth
                onChange={(value) => setFinishTime(value)}
            />
        </MuiPickersUtilsProvider>
        <div style={{ padding: '10px' }}></div>
        <Labels labels={props.labels} setLabel={setLabel} />
        <PriorityButtons
            priority={props.priority}
            onPriorityChange={onPriorityChange}
            priorities={props.priorities} />
        <div style={{ padding: '10px' }}></div>
        <ProjectButtons
            project={project}
            onProjectChange={onProjectChange} />
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

export default connect(mapStateToProps)(TaskForm);