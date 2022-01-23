import classes from "./SideDrawer.module.css";
import { NavLink } from "react-router-dom";
import ExpandableNavSection from "../ExpandableNavSection/ExpandableNavSection";
import db from "../../database";
import { v4 } from "uuid";
import { ProjectLists } from '../../db/ProjectDBUtil'
import ProjectForm from "../Projects/ProjectForm/ProjectForm";
import { useState } from "react";



const SideDrawer = (props) => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const onProjectAdd = (item) => {
    if (item.id) db.projects.update(item.id, { name: item.name });
    else
      db.projects.add({
        id: v4(),
        name: item.name,
        theme: item.theme
      });
      setShowProjectForm(false);
  };
  let form = null;
  if (showProjectForm)
    form = <ProjectForm
      onAdd={onProjectAdd}
      onClose={()=> setShowProjectForm(false)}/>

  const onDelete = (id) => {
    db.projects.where("id").equals(id).delete();
  }
  let projects = ProjectLists();
  return (
    <div
      className={classes.SideDrawer}
      style={{ display: props.visible ? "" : "none" }}
    >
      <NavLink activeClassName={classes.active} exact to="/">
        Home
      </NavLink>
      <NavLink activeClassName={classes.active} to="/tasks">
        Tasks
      </NavLink>
      <ExpandableNavSection
        sectionName="Projects"
        items={projects}
        onAddClick={() => setShowProjectForm(true)}
      />
      {form}
    </div>
  );
};

export default SideDrawer;
