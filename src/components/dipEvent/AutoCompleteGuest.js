import React, {useState, useContext, useEffect} from 'react';
import Select from 'react-select';
import { useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import components, { useStyles } from './AutoCompleteComponents';
import AppContext from "../../utils/context";
import {observer} from "mobx-react-lite";

const AutoCompleteGuest = observer(() => {
    const value = useContext(AppContext);
    const { rootStore: { userStore } } = value;
    const classes = useStyles();
    const theme = useTheme();
    const [single, setSingle] = useState(null);
    const [multi, setMulti] = useState(null);

    console.log('hola', userStore.list)

    const fetchUsers = () => {
        userStore.fetchUsers();
    };

    useEffect(fetchUsers, []);

    const handleChangeSingle = (value) => {
        setSingle(value);
    }

    const handleChangeMulti = (value) => {
        setMulti(value);
    }

    const selectStyles = {
        input: base => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
    };

    return (
        <div className={classes.root}>
            <NoSsr>
                <Select
                    classes={classes}
                    styles={selectStyles}
                    options={userStore.userSuggestions}
                    components={components}
                    value={single}
                    onChange={handleChangeSingle}
                    placeholder="Buscar un usuario"
                />
                <div className={classes.divider} />
                {/*<Select*/}
                {/*    classes={classes}*/}
                {/*    styles={selectStyles}*/}
                {/*    TextFieldProps={{*/}
                {/*        label: 'Label',*/}
                {/*        InputLabelProps: {*/}
                {/*            shrink: true,*/}
                {/*        },*/}
                {/*    }}*/}
                {/*    options={suggestions}*/}
                {/*    components={components}*/}
                {/*    value={multi}*/}
                {/*    onChange={handleChangeMulti}*/}
                {/*    placeholder="Select multiple countries"*/}
                {/*    isMulti*/}
                {/*/>*/}
            </NoSsr>
        </div>
    );
});

export default AutoCompleteGuest;
