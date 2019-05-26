import React from 'react';
import history from '../../utils/History';
import './EventItem.css';

const EventItem = ({ event }) => {

    const handleItemClick = () => {
        history.push('#')
    };

    return (
        <div className="eventWrapper">
            <div className="eventItem" onClick={handleItemClick}>
                {event.name}
            </div>
        </div>
    )
};

export default EventItem;
