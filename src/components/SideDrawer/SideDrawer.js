import classes from "./SideDrawer.module.css";
import { NavLink } from "react-router-dom";
import ExpandableNavSection from "../ExpandableNavSection/ExpandableNavSection";
import { ProjectLists } from '../../db/ProjectDBUtil'
import ProjectForm from "../Projects/ProjectForm/ProjectForm";
import { useState } from "react";
import DrawerContext from "../../Drawer-context";
import { useContext } from "react";
const SideDrawer = (props) => {
  const drawer = useContext(DrawerContext);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const onProjectAdd = () => {
      setShowProjectForm(false);
  };
  let form = null;
  if (showProjectForm)
    form = <ProjectForm
      onAdd={onProjectAdd}
      onClose={()=> setShowProjectForm(false)}/>

  
  let projects = ProjectLists();
  return (
    <div
      className={classes.SideDrawer}
      style={{ display: props.visible ? "" : "none" }}
    >
      <NavLink activeClassName={classes.active} 
      exact to="/"
      onClick={drawer.hideSideBarIfMobile}>
        Home
      </NavLink>
      <NavLink activeClassName={classes.active} to="/tasks"
      onClick={drawer.hideSideBarIfMobile}>
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
