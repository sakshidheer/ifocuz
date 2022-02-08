import { InputLabel, FormControl, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { ProjectLists } from '../../../../db/ProjectDBUtil';

const ProjectButtons = (props) => {
    let projects = ProjectLists();
    let projectItems = null;
    if (projects != null)
        projectItems = projects.map(item => {
            return <MenuItem
                value={item.id}
                key={item.id}>{item.name}</MenuItem>;
        })
    const inputLabel =useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
    return (
        <FormControl
            fullWidth
            variant="outlined"
            disabled={props.disableProject}>
            <InputLabel 
            ref={inputLabel}
            shrink htmlFor="outlined-project-native-simple">Project</InputLabel>
            <Select
                margin="normal"
                id="outlined-project-native-simple"
                label="project"
                value={props.project}
                input={
                    <OutlinedInput
                      notched
                      labelWidth={labelWidth}
                      name="age"
                      id="outlined-age-always-notched"
                    />
                  }
                onChange={e => { props.onProjectChange(e) }}
            >
                {projectItems}
            </Select>
        </FormControl>
    )
}

export default ProjectButtons;