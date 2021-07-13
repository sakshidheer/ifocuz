import React from 'react';
import classes from './TaskItem.module.css';
import { Icon } from '@iconify/react';
import hourglassStart from '@iconify-icons/vaadin/hourglass-start';
import hourglassDone from '@iconify-icons/emojione-monotone/hourglass-done';
import hourglassSplit from '@iconify-icons/bi/hourglass-split';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const TaskItem = props => {
    let classlist = [classes.tasklist];
    let statusIcon = hourglassStart;
    if (props.status === 2) {
        classlist.push(classes.completed);
        statusIcon = hourglassDone
    }
    else if (props.status === 1) {
        statusIcon = hourglassSplit
    }


    return (
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
                <span className={classes.iconPanel}>
                    <EditIcon style={{ color: '#137eec' }} fontSize="small" />
                    <DeleteIcon color="secondary" fontSize="small" />
                </span>

                <Chip
                    size="medium"
                    color="primary"
                    label={props.label}
                    className={classes.label}
                />
            </span>


            <div className={classes.time}>
                {props.finishTime.getHours()}:{props.finishTime.getMinutes() === 0 ? '00' : props.finishTime.getMinutes()}</div>

        </div>
    )
};

export default TaskItem;