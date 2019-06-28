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
import PaymentForm from '../components/payment/PaymentForm';

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
    const [operation, setOPeration] = useState(null);
    const [financialEntity, setFinancialEntity] = useState(null);
    const [cardInfo, setCardInfo] = useState({
        number: '',
        name: '',
        expiry: '',
        cvc: '',
    });

    const handleTypeChoose = type => () => {
        setFinancialEntity(type);
    };

    const handleAddFoundsClick = () => {
        userStore.postFounds(financialEntity, amount);
    };

    const handleInputChange = (event) => {
        setAmount(event.target.value);
    };

    const classes = useStyles();

    return (
        <div className="paymentRoot">
            <div className="paymentWrapper">
                <div className="accountBalance">
                    <span>{toFixedLocale(user.account.balance)}</span>
                </div>
                <div className="paymentTypes">
                    <div className="creditCard payment" role="button" tabIndex={0} onClick={handleTypeChoose('card')}>
                        <Cards
                            number={cardInfo.number}
                            name={cardInfo.name}
                            expiry={cardInfo.expiry}
                            cvc={cardInfo.cvc}
                            focused={cardInfo.focused}
                        />
                    </div>
                    <div className="easyPay payment" role="button" tabIndex={0} onClick={handleTypeChoose('other')}>
                        <img alt="" src="/img/pagofacil.png" />
                    </div>
                    <div className="loam payment">
                        <img alt="" src="/img/loan.jpg" />
                        <Button variant="contained" className={classes.button} onClick={handleTypeChoose('loan')}>Solicitar prestamo</Button>
                    </div>
                </div>
                <PaymentForm classes={classes} type={financialEntity} userStore={userStore} cardInfo={cardInfo} setCardInfo={setCardInfo} operation={operation} setOperation={setOPeration} />
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
        </div>
    );
});

export default Payment;
