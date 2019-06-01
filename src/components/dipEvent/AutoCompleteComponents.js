import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core';
import { emphasize } from '@material-ui/core/styles';
import clsx from 'clsx';

const NoOptionsMessage = ({ innerProps, children, selectProps }) => (
    <Typography
        color="textSecondary"
        className={selectProps.classes.noOptionsMessage}
        {...innerProps}
    >
        {children}
    </Typography>
);

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />;

const Control = ({
    selectProps, innerRef, children, innerProps,
}) => (
    <TextField
        fullWidth
        InputProps={{
            inputComponent,
            inputProps: {
                className: selectProps.classes.input,
                inputRef: innerRef,
                children,
                ...innerProps,
            },
        }}
        {...selectProps.TextFieldProps}
    />
);

const Option = ({
    innerRef, isFocused, isSelected, innerProps, children,
}) => (
    <MenuItem
        ref={innerRef}
        selected={isFocused}
        component="div"
        style={{
            fontWeight: isSelected ? 500 : 400,
        }}
        {...innerProps}
    >
        {children}
    </MenuItem>
);

const Placeholder = ({ selectProps, innerProps, children }) => (
    <Typography
        color="textSecondary"
        className={selectProps.classes.placeholder}
        {...innerProps}
    >
        {children}
    </Typography>
);

const SingleValue = ({ selectProps, innerProps, children }) => (
    <Typography className={selectProps.classes.singleValue} {...innerProps}>
        {children}
    </Typography>
);

const ValueContainer = ({ selectProps, children }) => <div className={selectProps.classes.valueContainer}>{children}</div>;

const MultiValue = ({
    children, selectProps, isFocused, removeProps,
}) => (
    <Chip
        tabIndex={-1}
        label={children}
        className={clsx(selectProps.classes.chip, {
            [selectProps.classes.chipFocused]: isFocused,
        })}
        onDelete={removeProps.onClick}
        deleteIcon={<CancelIcon {...removeProps} />}
    />
);

const Menu = ({ selectProps, innerProps, children }) => (
    <Paper square className={selectProps.classes.paper} {...innerProps}>
        {children}
    </Paper>
);

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer,
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        height: 50,
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto',
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: theme.spacing(0.5, 0.25),
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    singleValue: {
        fontSize: 16,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing(2),
    },
}));

export default components;
export { useStyles };
