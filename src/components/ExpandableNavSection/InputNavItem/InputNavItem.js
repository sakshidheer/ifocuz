import classes from './InputNavItem.module.css';
import { useState } from 'react';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Fragment } from 'react';
import DoneIcon from "@material-ui/icons/Done";


const InputNavItem = (props) => {
  let [value, setValue] = useState(props.name?props.name:'');
  let [wasTabPressed, setWasTabPressed] = useState(false);
  let [wasShiftTabPressed, setWasShiftTabPressed] = useState(false);
  const onDoneClickHandler = () => {
    props.onDoneclick({
      id: props.id,
      name: value
    });
  }
  const onInputKeyDown = (e) => {
    if (e.keyCode === 9) {
      setWasTabPressed(true);
      setWasShiftTabPressed(false);
    } else if (e.keyCode === 13)
      onDoneClickHandler();
  }

  const onInputBlur = () => {
    if (!wasTabPressed)
      props.onBlur();
  }

  const onBtnKeyDown = (event) => {
    if (event.shiftKey && event.keyCode === 9) {
      setWasShiftTabPressed(true);
      setWasTabPressed(false)
    }

  }

  const onBtnBlur = () => {
    if (!wasShiftTabPressed)
      props.onBlur();
  }

  return <Fragment> <Input
    id="standard-adornment-password"
    type='text'
    value={value}
    width="100px"
    autoFocus={true}
    className={classes.inputnavlink}
    onChange={(e) => setValue(e.target.value)}
    onBlur={onInputBlur}
    onKeyDown={onInputKeyDown}
    endAdornment={
      <InputAdornment position="end">
        <IconButton
          aria-label="add new project"
          onClick={() => { console.log('onClick'); }}
          onKeyDown={onBtnKeyDown}
          onBlur={onBtnBlur}
        >
          <DoneIcon />
        </IconButton>
      </InputAdornment>

    }
  />
  </Fragment>
}

export default InputNavItem;