import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import classes from './ExpandableNavSection.module.css';
import ProjectForm from '../Projects/ProjectForm/ProjectForm';
import { NavLink } from "react-router-dom";
const ExpandableNavSection = (props) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  let form = null;
  if (showProjectForm)
    form = <ProjectForm />

  const addClick = () => {
    setShowProjectForm(true);
  };

  let items = [];
  if (props.items)
    items = props.items.map((item) => {
      let toPath = "/projects/" + item.name;
      return <NavLink activeClassName={classes.active} to={{
        pathname: toPath,
        state: { id: item.id }
      }}>
        {item.name}
      </NavLink>
    });
  return (
    <div className={classes.navSec}>
      <div>
        <span>{props.sectionName}</span>
        <IconButton onClick={addClick}>
          <AddIcon />
        </IconButton>
      </div>
      {items}
      {form}
    </div>
  );
};

export default ExpandableNavSection;
