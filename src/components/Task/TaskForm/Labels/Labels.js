import { InputLabel, FormControl, Select } from '@material-ui/core';

const Labels = (props) => {
    let labelItem = props.labels.map(item => {
        return <option
            value={item.value}
            key={item.value}>{item.displayName}</option>;
    })
    return (
        <FormControl
            fullWidth
            variant="outlined"
            margin="normal">
            <InputLabel htmlFor="outlined-label-native-simple">Label</InputLabel>
            <Select
                native
                label="label"
                value={props.label}
                onChange={(e) => props.setLabel(e.target.value)}
            >
                {labelItem}
            </Select>
        </FormControl>
    )
}

export default Labels;