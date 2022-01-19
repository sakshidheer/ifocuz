import classes from "./EditableNavLink.module.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { IconButton } from "@material-ui/core";
import InputNavItem from "../InputNavItem/InputNavItem";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Fragment } from "react";
import DeleteConfirmDialogue from '../../DeleteConfirmDialogue/DeleteConfirmDialogue';

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

  const onDeleteClick = () => {
    setOpen(true);
  }

  const handleDialogueClose = () => {
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
    let toPath = "/projects/" + props.name;
    item = (
      <div className={classes.editablenav}>
        <NavLink activeClassName={classes.active} to={{
          pathname: toPath,
          state: { id: props.id }
        }}>
          {props.name}
        </NavLink>
        <IconButton className={[classes.button, classes.editIcon].join(" ")} onClick={onEditButtonClick}>
          <EditIcon />
        </IconButton>
        <IconButton className={[classes.button, classes.deleteIcon].join(" ")} onClick={onDeleteClick}>
          <DeleteIcon />
        </IconButton>
      </div> 
    );
  }
  return <Fragment>{item}
    <DeleteConfirmDialogue
      onClose={handleDialogueClose}
      open={open}
      onDelete={() => { props.onDelete(props.id); setOpen(false) }} />
  </Fragment>;
};

export default EditableNavLink;
