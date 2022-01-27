import { useLocation } from 'react-router-dom';
import Task from '../Tasks/Tasks';
import classes from './Project.module.css'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import db from '../../database';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProjectForm from '../../components/Projects/ProjectForm/ProjectForm';

const Project = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    let location = useLocation();
    let history = useHistory();
    let [show, setShow] = useState(false);
    let form = null;
    let theme = '#ccc';
    if (location && location.state && location.state.id)
        theme = location.state.theme;
    const onMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const onProjectEditComplete = () =>{
        setShow(false);
    }
    if (show)
        form = <ProjectForm {...location.state} 
        show={show} onClose={() => setShow(false)}
        onAdd={onProjectEditComplete} />;
    const handleDelete = () => {
        db.projects.where("id").equals(location.state.id).delete();
        history.push("../../");
    }

    const handleEdit = () => {
        setShow(true);
        setAnchorEl(null);
    }

    

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
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
        {form}
    </div>)
}

export default Project;