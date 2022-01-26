import {InputLabel, FormControl, Select,MenuItem } from '@material-ui/core';
import {ProjectLists} from '../../../../db/ProjectDBUtil';

const ProjectButtons = (props) => {
    let projects = ProjectLists();
    let projectItems = null;
    if (projects != null)
        projectItems = projects.map(item => {
            return <MenuItem
                value={item.id}
                key={item.id}>{item.name}</MenuItem>;
        })
    return (
        <FormControl
            fullWidth
            variant="outlined"
            disabled={props.disableProject}>
            <InputLabel shrink htmlFor="outlined-project-native-simple">Project</InputLabel>
            <Select
                
                margin="none"
                id="outlined-project-native-simple"
                label="project"
                value={props.project}
                onChange={e => {props.onProjectChange(e)}}
            >
                {projectItems}
            </Select>
        </FormControl>
    )
}

export default ProjectButtons;