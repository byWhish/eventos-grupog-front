import React, { useState } from 'react';
import UserProfile from "../userProfile/UserProfile";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import './EventInfo.css';
import FormControl from "@material-ui/core/FormControl";

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
        minWidth: 500,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const EventInfo = () => {
    const classes = useStyles();

    const [values, setValues] = useState({
        type: '',
        name: '',
        datetime: new Date(),
        deadline: new Date(),
        description: ''
    });

    const handleTypeChange = (event) => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleInputChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    return(
        <div className="EventInfoWrapper" >
            <div className="profileWrapper">
                <UserProfile />
            </div>
            <div className="infoWrapper">
                <div className="eventType">
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="age-simple">Tipo</InputLabel>
                    <Select
                        value={values.type}
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
                <div className="eventName">
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-name"
                        label="Name"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleInputChange('name')}
                        margin="normal"
                    />
                    </FormControl>
                </div>
                <div className="eventDateTime">
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="datetime-local"
                        label="Fecha y hora del evento"
                        type="datetime-local"
                        defaultValue=""
                        value={values.datetime}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange('datetime')}
                    />
                    </FormControl>
                </div>
            </div>
            <div className="eventDeadLine">
                <div className="eventDeadLineDateTime">
                    <FormControl className={classes.formControl}>
                    <TextField
                        id="datetime-local"
                        label="Fecha y hora limite"
                        type="datetime-local"
                        defaultValue=""
                        value={values.deadline}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleInputChange('deadline')}
                    />
                    </FormControl>
                </div>
            </div>
            <div className="eventDescription">
                <FormControl className={classes.formControlMultiline}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Descripcion"
                    multiline
                    rowsMax="4"
                    value={values.description}
                    onChange={handleInputChange('description')}
                    className={classes.textField}
                    margin="normal"
                    // helperText="hello"
                    variant="outlined"
                />
                </FormControl>
            </div>
        </div>
    )
}

export default EventInfo;
