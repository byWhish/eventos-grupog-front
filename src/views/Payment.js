import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Cards from 'react-credit-cards';
import 'react-credit-cards/lib/styles.scss';
import './Payment.css';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { observer } from 'mobx-react-lite';
import AppContext from '../utils/context';
import { toFixedLocale } from '../utils/local';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const Payment = observer(() => {
    const value = useContext(AppContext);
    const { rootStore: { userStore } } = value;
    const { user } = userStore;
    const [amount, setAmount] = useState(0);
    const [financialEntity, setFinancialEntity] = useState(null);

    const handleTypeChoose = type => () => {

    };

    const handleAddFoundsClick = () => {
        userStore.postFounds(financialEntity, amount);
    };

    const handleInputChange = (event) => {
        setAmount(event.target.value);
    };

    const classes = useStyles();
    return (
        <div className="paymentWrapper">
            <div className="accountBalance">
                <span>{toFixedLocale(user.account.balance)}</span>
            </div>
            <div className="paymentTypes">
                <div className="creditCard" role="button" tabIndex={0} onClick={handleTypeChoose('card')}>
                    <Cards
                        number=""
                        name=""
                        expiry=""
                        cvc=""
                        focused=""
                    />
                </div>
                <div className="easyPay" role="button" tabIndex={0} onClick={handleTypeChoose('other')}>
                    <img alt="" src="/img/pagofacil.png" />
                </div>
                <div className="loam" role="button" tabIndex={0} onClick={handleTypeChoose('loan')}>
                    <img alt="" src="/img/loan.jpg" />
                </div>
            </div>
            <div className="amount">
                <FormControl className={classes.formControl}>
                    <TextField
                        id="standard-name"
                        label="Monto"
                        className={classes.textField}
                        value={amount}
                        onChange={handleInputChange}
                        margin="normal"
                    />
                </FormControl>
            </div>
            <Button variant="contained" className={classes.button} onClick={handleAddFoundsClick}>Agregar fondos</Button>
        </div>
    );
});

export default Payment;
