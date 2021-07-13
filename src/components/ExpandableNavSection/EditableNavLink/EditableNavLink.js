import classes from "./EditableNavLink.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import InputNavItem from "../InputNavItem/InputNavItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fragment } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const EditableNavLink = (props) => {
  let [editable, setEditable] = useState(false);
  const onEditButtonClick = () => {
    setEditable(true);
  };
  const onDoneclick = (item) => {
    props.onDoneclick(item);
    setEditable(false);
  }

  let [open, setOpen] = useState(false);

  const onDeleteClick = props => {
    setOpen(true);
  }

  const handleDialogueClose = props => {
    setOpen(false);
  }
  let item = null;
  if (editable) {
    item = <InputNavItem
      name={props.name}
      id={props.id}
      onDoneclick={onDoneclick}
      onBlur={() => setEditable(false)} />;
  }
  else {
    item = (
      <div>
        <NavLink activeClassName={classes.active} to="/projects/:category">
          {props.name}
        </NavLink>
        <IconButton className={[classes.button, classes.editIcon].join(" ")}>
          <EditIcon onClick={onEditButtonClick} />
        </IconButton>
        <IconButton className={[classes.button, classes.deleteIcon].join(" ")}>
          <DeleteIcon onClick={onDeleteClick} />
        </IconButton>
      </div>
    );
  }
  return <Fragment>{item}
    <Dialog
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
    </Dialog></Fragment>;
};

export default EditableNavLink;
