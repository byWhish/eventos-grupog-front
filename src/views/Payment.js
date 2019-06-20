import React from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const handleAddFoundsClick = () => {

};

const Payment = () => {
    const classes = useStyles();
    return (
        <div className="paymentWrapper">
            <div className="accountBalance">
                0
            </div>
            <div className="creditCard" />
            <div className="easyPay" />
            <div className="amount">
                0
            </div>
            <Button variant="contained" className={classes.button} onClick={handleAddFoundsClick}>Agregar fondos</Button>}
        </div>
    );
};

export default Payment;
