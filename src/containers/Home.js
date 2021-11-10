import React from "react";
import TaskList from '../components/Task/TaskList/TaskList';
import { Switch, FormControlLabel } from '@material-ui/core';
import { useState } from 'react';

const Home = props => {
    let [hideDone, setHideDone] = useState(false);

    return <div>
        <FormControlLabel
            control={<Switch checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} name="gilad" />}
            label="Hide Done"
            style={{marginLeft:'5px'}}
        />
        <TaskList today={true} hideDone={hideDone} /></div>

}

export default Home;