import EditableNavLink from "./EditableNavLink/EditableNavLink";
import { IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import InputNavItem from "./InputNavItem/InputNavItem";

const ExpandableNavSection = (props) => {
  const [addNewItem, setAddNewItem] = useState(false);
  //addNewNavItem
  const addClick = () => {
    setAddNewItem(true);
  };

  const onDoneclick = (item) => {
    props.onDoneclick(item);
    setAddNewItem(false);
  };

  const onInputNavItemBlur = () => {
    setAddNewItem(false);
  }
  let newitem = null,
    items = [];
  if (props.items)
    items = props.items.map((item) => {
      return <EditableNavLink 
      name={item.name} 
      id={item.id} 
      onDoneclick={onDoneclick}
      onDelete={props.onDelete}/>;
    });
  if (addNewItem) newitem = <InputNavItem 
  onDoneclick={onDoneclick}
  onBlur={onInputNavItemBlur} />;
  return (
    <div>
      <div>
        <span>{props.sectionName}</span>
        <IconButton onClick={addClick}>
          <AddIcon />
        </IconButton>
      </div>
      {items}
      {newitem}
    </div>
  );
};

export default ExpandableNavSection;
