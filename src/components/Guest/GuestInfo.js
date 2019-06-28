import React from 'react';
import MoneyCollection from './MoneyCollection';
import CommonAccount from "./CommonAccount";

const GuestInfo = ({
    user, guest, event, eventStore, handleAddFounds, classes,
}) => {
    switch (event.type) {
        case 'CommonAccountEvent':
            return (
                <CommonAccount
                    user={user}
                    guest={guest}
                    event={event}
                    eventStore={eventStore}
                    handleAddFounds={handleAddFounds}
                    classes={classes}
                />
            );
        case 'BasketEvent':
        case 'PartyEvent':
            return null;
        case 'MoneyCollectionEvent':
            return (
                <MoneyCollection
                    user={user}
                    guest={guest}
                    event={event}
                    eventStore={eventStore}
                    handleAddFounds={handleAddFounds}
                    classes={classes}
                />
            );
        default:
            return null;
    }
};

export default GuestInfo;
