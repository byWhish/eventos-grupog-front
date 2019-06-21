import React, { useContext, useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import AppContext from '../utils/context';
import { STATE_PENDING } from '../config';
import Loading from '../components/Loading';
import './DipEvento.css';
import GuestItem from '../components/dipEvent/GuestItem';
import ModalLoading from '../components/ModalLoading';
import {toFixedLocale, toLocalDateTime} from "../utils/local";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const DipEvent = observer(({ match }) => {
    const classes = useStyles();
    const value = useContext(AppContext);
    const [amount, setAmount] = useState(1);
    const [open, setOpen] = useState(false);
    const { rootStore: { eventStore } } = value;
    const { params: { id } } = match;
    const event = eventStore.getEvent(id);
    const guest = eventStore.getEventGuest(id);

    const fetchAmountToPay = () => {
        eventStore.fethcGuestAmountToPay(event, guest)
            .then((result) => {
                setAmount(result);
            });
    };

    const handlePayClick = () => {
        setOpen(true);
    };

    const handleConfirmClick = () => {
        setOpen(true);
        eventStore.fetchGuestConfirm(guest.id);
    };

    useEffect(fetchAmountToPay, []);

    if (eventStore.eventState === STATE_PENDING) return <Loading />;

    return (
        <div className="DipEvento">
            <div className="leftPanel" />
            <div className="rightPanel">
                <div className="eventHeader">
                    <div className="eventInnerWrapper">
                        <div className="eventTitle">
                            <span>{event.name}</span>
                        </div>
                        <div className="eventHeldAt">
                            <span>{toLocalDateTime(event.heldAt)}</span>
                        </div>
                    </div>
                </div>
                <div className="eventInfo">
                    <div className="eventInnerWrapper">
                        <div className="ownerInfo">
                            <div className="eventOwner">{event.ownerFullName}</div>
                            <div className="eventDescription">{event.description}</div>
                        </div>
                        <div className="guestInfo">
                            <div className="paymentInfo">
                                <span>{toFixedLocale(guest.user.account.balance)}</span>
                                <Button variant="contained" className={classes.button} onClick={handlePayClick}>Agregar fondos</Button>
                                <span>{toFixedLocale(amount)}</span>
                                <Button variant="contained" className={classes.button} onClick={handlePayClick}>Pagar</Button>
                            </div>
                            <div className="assistInfo">
                                <span className="deadline">{event.deadline.toLocaleDateString()}</span>
                                {guest.confirmedAssistance
                                    ? <span>Confirmed</span>
                                    : <Button variant="contained" className={classes.button} onClick={handleConfirmClick}>Confirmar asistencia</Button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="eventListsWrapper">
                    <div className="eventInnerWrapper">
                        <div className="guestList">
                            {event.guestsList.map(guest => <GuestItem guest={guest} />)}
                        </div>
                    </div>
                </div>
            </div>
            <ModalLoading state={eventStore.confirState} open={open} setOpen={setOpen} />
        </div>
    );
});

export default DipEvent;
