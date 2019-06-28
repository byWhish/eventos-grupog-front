import React from 'react';
import MoneyCollection from './MoneyCollection';

const GuestInfo = ({
    user, guest, event, eventStore, handleAddFounds, classes,
}) => {
    switch (event.type) {
        case 'CommonAccountEvent':
            return null;
        case 'BasketEvent':
            return null;
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
