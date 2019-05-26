import React from 'react';
import './EventItem.css';

const EventItem = ({ event }) => {
    return (
        <div className="eventWrapper">
            {event.name}
        </div>
    )
};

export default EventItem;
