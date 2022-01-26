import React, { useState } from 'react';
import classes from './TaskForm.module.css';
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
import { useRef } from 'react';

const TaskForm = (props) => {
    let [task, setTask] = useState(props.task);
    let [finishTime, setFinishTime] = useState(props.finishTime);
    let [priority, setPriority] = useState(props.priority);
    let [label, setLabel] = useState(props.label);
    let [taskValid, setTaskValid] = useState(true);
    let [finishDateValid, setFinishDateValid] = useState(true);
    let [project, setProject] = useState(props.project);
    let initialRender = useRef(true);
    useEffect(() => {
        if (initialRender.current) {
            initialRender.current = false;
        }
        setTask(props.task);
        setFinishTime(props.finishTime);
        setPriority(props.priority);
        setProject(props.project);
        setLabel(props.label);
    }, [props])
    const onProjectChange = (e) => {
        setProject(e.target.value)
    }
    const resetForm = () => {
        props.resetForm();
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
        let dbObj = {
            id: props.editMode ? props.id : v4(),
            task: task,
            finishTime: finishTime,
            priority: priority,
            label: label,
            status: 0,
            project: project
        };
        if (props.editMode)
            database.todolist.update(props.id, dbObj);
        else
            database.todolist.add(dbObj)
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
            priority={priority}
            onPriorityChange={onPriorityChange}
            priorities={props.priorities} />
        <div style={{ padding: '10px' }}></div>
        <ProjectButtons
            project={project}
            onProjectChange={onProjectChange} 
            disableProject={props.disableProject}/>
        <div className={classes.addContainer}>
            <Button variant="contained" color="secondary" onClick={addTask}>
                Add Task
            </Button>
        </div>

    </div>
};

export default TaskForm;