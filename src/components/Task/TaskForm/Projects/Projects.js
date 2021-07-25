import {InputLabel, FormControl, Select } from '@material-ui/core';
import {ProjectLists} from '../../../../db/ProjectDBUtil';

const ProjectButtons = (props) => {
    let projects = ProjectLists();
    let projectItems = null;
    if (projects != null)
        projectItems = projects.map(item => {
            return <option
                value={item.id}
                key={item.id}>{item.name}</option>;
        })
    return (
        <FormControl
            fullWidth
            variant="outlined">
            <InputLabel shrink htmlFor="outlined-project-native-simple">Project</InputLabel>
            <Select
                native
                margin="normal"
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