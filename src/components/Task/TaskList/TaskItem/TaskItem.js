import React, { useState } from 'react';
import classes from './TaskItem.module.css';
import { Icon } from '@iconify/react';
import hourglassStart from '@iconify-icons/vaadin/hourglass-start';
import hourglassDone from '@iconify-icons/emojione-monotone/hourglass-done';
import hourglassSplit from '@iconify-icons/bi/hourglass-split';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fragment } from 'react';
import DeleteConfirmDialogue from '../../../DeleteConfirmDialogue/DeleteConfirmDialogue';
import { ProjectLists } from '../../../../db/ProjectDBUtil';

const TaskItem = props => {
    let [open, setOpen] = useState(false);
    let classlist = [classes.tasklist];
    let statusIcon = hourglassStart;
    if (props.status === 2) {
        classlist.push(classes.completed);
        statusIcon = hourglassDone
    }
    else if (props.status === 1) {
        statusIcon = hourglassSplit
    }

    let onDeleteIconClick = () => {
        setOpen(true);
    }
    let handleDialogueClose = () => {
        //database.todolist
        setOpen(false);
    }
    let projects = ProjectLists();
    let project = null, projectSec = null;
    if (projects != null) {
        project = projects.find(item => item.id === props.project);
        projectSec = project ? <div className={classes.projectSec}>{project.name}</div>: null;
    }
    let editable = props.editable == null ? true : props.editable;
    return (
        <Fragment>
            <div
                key={props.id}
                style={{ '--priorityColor1': props.color }}
                className={classlist.join(' ')}>
                <Icon
                    color={props.color}
                    icon={statusIcon}
                    height="15"
                    onClick={props.onStatusIconClick} />
                <span className={classes.text}>{props.task}</span>

                <span className={classes.right}>
                {editable ?<span className={classes.iconPanel}>
                        <EditIcon style={{ color: '#137eec' }} fontSize="small" onClick={()=> props.onTaskEdit(props)}/>
                        <DeleteIcon color="secondary" fontSize="small" onClick={onDeleteIconClick} />
                    </span>: null}

                    <Chip
                        size="medium"
                        color="primary"
                        label={props.label}
                        className={classes.label}
                    />

                </span>
                {projectSec}
            </div>
            <DeleteConfirmDialogue
                onClose={handleDialogueClose}
                open={open}
                onDelete={() => { props.onDelete(props.id); setOpen(false) }} />
        </Fragment>
    )
};

export default TaskItem;