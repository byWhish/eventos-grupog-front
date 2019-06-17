import React from 'react';
import './GuestItem.css';

const GuestItem = ({ guest }) => (
    <div className="guestWrapper">
        <div className="guestAvatar">
            <img src="/img/guest.png" alt="" />
        </div>
        <div className="guestName">
            <span>{guest.name}</span>
        </div>
        <div className="guestAssistIcon">
            <img src={`/img/${guest.confirmedAssistance ? 'accept.svg' : 'cancel.png'}`} alt="" />
        </div>
    </div>
);

export default GuestItem;
