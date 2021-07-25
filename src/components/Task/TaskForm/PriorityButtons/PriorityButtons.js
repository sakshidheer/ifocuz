import { RadioGroup, Radio, FormControlLabel ,InputLabel} from '@material-ui/core';
import { Fragment } from 'react';
import classes from './PriorityButtons.module.css';

const PriorityButtons = (props) => {
    let radioButtons = Object.entries(props.priorities).map(item => {
        let [key, value] = item;
        return <FormControlLabel
            value={key}
            key={key}
            control={<Radio />}
            style={{ '--labelColor': value }}
            label={key}
            className={classes.radioButton}
        />
    });
    return (
        <Fragment>
            <InputLabel margin='dense' variant="outlined" shrink>Priority</InputLabel>
            <RadioGroup
                aria-label="priority"
                name="priority"
                value={props.priority}
                onChange={props.onPriorityChange} row>
                {radioButtons}
            </RadioGroup>
        </Fragment>

    )
}

export default PriorityButtons;