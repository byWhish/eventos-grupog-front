import React, {
    useEffect, useState, useCallback,
} from 'react';
import Button from '@material-ui/core/Button';
import { toFixedLocale } from '../../utils/local';

const MoneyCollection = ({
    user, event, classes, eventStore, guest, setOpen, handleAddFounds,
}) => {
    const [amount, setAmount] = useState(0);

    const fetchAmountToPay = () => {
        eventStore.fethcGuestAmountToPay(event, guest)
            .then((result) => {
                setAmount(result);
            });
    };

    const handlePayClick = useCallback(() => {
        setOpen(true);
        eventStore.postGuestPayment(guest.id);
    }, []);

    useEffect(fetchAmountToPay, []);

    return (
        <div className="paymentInfo">
            <span>{toFixedLocale(user.account.balance)}</span>
            <Button variant="contained" className={classes.button} onClick={handleAddFounds}>Agregar fondos</Button>
            <span>{toFixedLocale(amount)}</span>
            <Button variant="contained" className={classes.button} onClick={handlePayClick}>Pagar</Button>
        </div>

    );
};

export default MoneyCollection;
