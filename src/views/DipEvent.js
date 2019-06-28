import React, {
    useContext, useEffect, useState,
} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import AppContext from '../utils/context';
import { STATE_PENDING } from '../config';
import Loading from '../components/Loading';
import './DipEvento.css';
import GuestItem from '../components/dipEvent/GuestItem';
import ModalLoading from '../components/ModalLoading';
import { toFixedLocale, toLocalDateTime } from '../utils/local';
import history from '../utils/History';
import MoneyCollection from '../components/Guest/MoneyCollection';
import ConfirmNode from '../components/Guest/ConfirmNode';
import GuestInfo from "../components/Guest/GuestInfo";

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
                                eventStore={eventStore}
                            />
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
