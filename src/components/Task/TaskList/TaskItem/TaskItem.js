import React,{useState} from 'react';
import classes from './TaskItem.module.css';
import { Icon } from '@iconify/react';
import hourglassStart from '@iconify-icons/vaadin/hourglass-start';
import hourglassDone from '@iconify-icons/emojione-monotone/hourglass-done';
import hourglassSplit from '@iconify-icons/bi/hourglass-split';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { Fragment } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import database from '../../../../database';
import Button from '@material-ui/core/Button';

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
                    <span className={classes.iconPanel}>
                        <EditIcon style={{ color: '#137eec' }} fontSize="small" />
                        <DeleteIcon color="secondary" fontSize="small" onClick={onDeleteIconClick} />
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

            </div><Dialog
                open={open}
                onClose={handleDialogueClose}
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed with delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={handleDialogueClose}>
                        Cancel
                    </Button>
                    <Button color="primary" onClick={() => { props.onDelete(props.id); setOpen(false) }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
};

export default TaskItem;