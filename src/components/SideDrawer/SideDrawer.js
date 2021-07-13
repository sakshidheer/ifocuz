import classes from "./SideDrawer.module.css";
import { NavLink } from "react-router-dom";
import ExpandableNavSection from "../ExpandableNavSection/ExpandableNavSection";
import db from "../../database";
import { useLiveQuery } from "dexie-react-hooks";
import { v4 } from "uuid";

const SideDrawer = (props) => {
  const onProjectDoneBtnclick = (item) => {
    if (item.id) db.projects.update(item.id, {name :item.name});
    else
      db.projects.add({
        id: v4(),
        name: item.name,
      });
  };

  const onDelete = (id) =>{
    db.projects.where("id").equals(id).delete();
  }
  let projects = useLiveQuery(() => {
    return db.projects.toArray();
  });
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
        onDoneclick={onProjectDoneBtnclick}
        items={projects}
        onDelete={onDelete}
      />
    </div>
  );
};

export default SideDrawer;
