import React, { useContext, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { observer } from 'mobx-react-lite';
import AppContext from '../utils/context';
import { STATE_PENDING } from '../config';
import Loading from '../components/Loading';
import './DipEvento.css';
import ModalLoading from '../components/ModalLoading';
import { toLocalDateTime } from '../utils/local';
import history from '../utils/History';
import ConfirmNode from '../components/Guest/ConfirmNode';
import GuestInfo from '../components/Guest/GuestInfo';
import GuestList from '../components/dipEvent/GuestList';
import GuestProducts from '../components/dipEvent/GuestProducts';
import EventProducts from '../components/dipEvent/EventProducts';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const handleAddFounds = () => {
    history.push('/payment');
};

const DipEvent = observer(({ match }) => {
    const classes = useStyles();
    const value = useContext(AppContext);
    const [open, setOpen] = useState(false);
    const { rootStore: { eventStore, userStore } } = value;
    const { params: { id } } = match;
    const event = eventStore.getEvent(id);
    const guest = eventStore.getEventGuest(id);
    const { user } = userStore;

    if (eventStore.eventState === STATE_PENDING) return <Loading />;

    const addProduct = (product) => {
        event.addGuestProduct(guest.id, product);
    };

    const removeProduct = (product) => {
        event.removeGuestProduct(guest.id, product);
    };

    return (
        <div className="DipWrapper">
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
                                <GuestInfo
                                    user={user}
                                    guest={guest}
                                    event={event}
                                    eventStore={eventStore}
                                    handleAddFounds={handleAddFounds}
                                    classes={classes}
                                />
                                <ConfirmNode
                                    guest={guest}
                                    event={event}
                                    classes={classes}
                                    setOpen={setOpen}
                                    eventStore={eventStore}
                                />
                            </div>
                            <div className="eventGuests">
                                <GuestList guests={event.guestsList} />
                            </div>
                        </div>
                    </div>
                    <div className="eventListsWrapper">
                        <EventProducts eventType={event.type} items={event.products} addProduct={addProduct} />
                        <GuestProducts eventType={event.type} items={guest.products} removeProduct={removeProduct} setOpen={setOpen} />
                    </div>
                </div>
                <ModalLoading state={eventStore.confirState} open={open} setOpen={setOpen} />
            </div>
        </div>
    );
});

export default DipEvent;
