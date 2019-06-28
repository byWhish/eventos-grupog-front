import React from 'react';
import GuestItem from './GuestItem';

const GuestList = ({ guests }) => (
    <div className="eventInnerWrapper">
        <div className="guestList">
            {guests.map(guest => <GuestItem guest={guest} />)}
        </div>
    </div>
);

export default GuestList;
