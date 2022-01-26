import { useLocation } from 'react-router-dom';
import Task from '../Tasks/Tasks';
import classes from './Project.module.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';

const Project = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const onMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    let location = useLocation();
    let theme = '#ccc';
    if (location && location.state && location.state.id)
        theme = location.state.theme;
    return (<div
        className={classes.container}
        style={{ '--bgColor': theme }}>
        <Task />
        <IconButton onClick={onMoreClick} className={classes.moreBtn}>
            <MoreHorizIcon />
        </IconButton>
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
    </div>)
}

export default Project;