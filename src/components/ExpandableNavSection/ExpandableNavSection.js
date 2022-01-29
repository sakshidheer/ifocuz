import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import DrawerContext from "../../Drawer-context";
import classes from './ExpandableNavSection.module.css';

const ExpandableNavSection = (props) => {
  const drawer = useContext(DrawerContext);
  let items = [];
  if (props.items)
    items = props.items.map((item) => {
      let toPath = "/projects/" + item.name;
      return <NavLink 
      activeClassName={classes.active} to={{
        pathname: toPath,
        state: {...item} ,
        key: item.id
      }}
      key= {item.id}
      onClick={drawer.hideSideBarIfMobile}>
        {item.name}
      </NavLink>
    });
  return (
    <div className={classes.navSec}>
      <div>
        <span>{props.sectionName}</span>
        <IconButton onClick={props.onAddClick}>
          <AddIcon />
        </IconButton>
      </div>
      {items}
    </div>
  );
};

export default ExpandableNavSection;
