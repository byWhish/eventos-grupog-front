import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {observer} from 'mobx-react-lite';
import {toFixedLocale} from '../../utils/local';
import AppContext from '../../utils/context';
import './RequestLoan.css';

const useStyles = makeStyles(theme => ({
    button: {
        margin: theme.spacing(1),
    },
}));

const RequestLoan = observer(({ userStore }) => {
    console.log('hola', userStore);
    const value = useContext(AppContext);
    const { rootStore: { loanStore } } = value;
    const { user } = userStore;
    const installments = 6;
    const amount = 1000;

    const handleRequestLoan = () => {
        userStore.postRequestLoan(loanStore);
    };

    const classes = useStyles();

    if (user.isDefaulter) return <span>no puede pedir un prestamo porque tiene pagos pendientes</span>;

    return (
        <div className="loanWrapper">
            <div className="accountBalance">
                <span>{toFixedLocale(user.account.balance)}</span>
                <span className="plusAmount">{`+ ${toFixedLocale(amount)}`}</span>
            </div>
            <div className="installmentsInfo">
                <span>{`${installments} cuotas de ${toFixedLocale(amount / installments)}`}</span>
            </div>
            <Button variant="contained" className={classes.button} onClick={handleRequestLoan}>Solicitar prestamo</Button>
        </div>
    );
});

export default RequestLoan;
