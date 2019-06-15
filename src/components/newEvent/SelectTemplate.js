import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import React, { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    formControlMultiline: {
        margin: theme.spacing(1),
        width: '90%',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const SelectTemplate = () => {
    const classes = useStyles();
    const [type, setType] = useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    return (
        <div className="templateWrapper">
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Tipo</InputLabel>
                <Select
                    value={type}
                    onChange={handleTypeChange}
                    inputProps={{
                        name: 'type',
                        id: 'age-simple',
                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>Fiesta</MenuItem>
                    <MenuItem value={2}>Vaquita modalidad 1</MenuItem>
                    <MenuItem value={3}>Vaquita modalidad 2</MenuItem>
                    <MenuItem value={4}>Canasta</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default SelectTemplate;
