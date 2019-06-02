import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import './EventInfo.css';
import FormControl from '@material-ui/core/FormControl';
import UserProfile from '../userProfile/UserProfile';

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

const EventInfo = ({ values, setValues }) => {
    const classes = useStyles();

    const handleTypeChange = (event) => {
        setValues(oldValues => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleInputChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    return (
        <div className="EventInfoWrapper">
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
                            <MenuItem value="party">Fiesta</MenuItem>
                            <MenuItem value="moneyCollection">Vaquita modalidad 1</MenuItem>
                            <MenuItem value="commonAccount">Vaquita modalidad 2</MenuItem>
                            <MenuItem value="basket">Canasta</MenuItem>
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
                            value={values.heldAt}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={handleInputChange('heldAt')}
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
    );
};

export default EventInfo;
