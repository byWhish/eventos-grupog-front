import React, { useState } from 'react';
import Select from 'react-select';
import { useTheme } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import { observer } from 'mobx-react-lite';
import components, { useStyles } from './AutoCompleteComponents';

const AutoCompleteList = observer(({ onSelectItem, placeHolder, options }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [single, setSingle] = useState(null);
    // const [multi, setMulti] = useState(null);

    const handleChangeSingle = (item) => {
        setSingle(item);
        onSelectItem(item.value);
    };

    // const handleChangeMulti = (value) => {
    //     setMulti(value);
    // }

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
                    options={options}
                    components={components}
                    value={single}
                    onChange={handleChangeSingle}
                    placeholder={placeHolder}
                />
                <div className={classes.divider} />
                {/* <Select */}
                {/*    classes={classes} */}
                {/*    styles={selectStyles} */}
                {/*    TextFieldProps={{ */}
                {/*        label: 'Label', */}
                {/*        InputLabelProps: { */}
                {/*            shrink: true, */}
                {/*        }, */}
                {/*    }} */}
                {/*    options={suggestions} */}
                {/*    components={components} */}
                {/*    value={multi} */}
                {/*    onChange={handleChangeMulti} */}
                {/*    placeholder="Select multiple countries" */}
                {/*    isMulti */}
                {/* /> */}
            </NoSsr>
        </div>
    );
});

export default AutoCompleteList;
