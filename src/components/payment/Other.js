import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const Other = ({ classes, operation, setOperation }) => {
    const handleInputChange = (event) => {
        setOperation(event.target.value);
    };
    return (
        <FormControl className={classes.formControl}>
            <TextField
                id="standard-name"
                label="Codigo de operacion"
                className={classes.textField}
                value={operation}
                onChange={handleInputChange}
                margin="normal"
            />
        </FormControl>
    );
};

export default Other;
