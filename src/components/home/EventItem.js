import React from 'react';
import history from '../../utils/History';
import './EventItem.css';
import { toLocalDateTimeShort } from '../../utils/local';

const EventItem = ({ event }) => {
    const handleItemClick = () => {
        history.push(`/dipEvent/${event.id}`);
    };

    return (
        <div className="eventWrapper">
            <div className="eventItem" role="button" tabIndex={0} onClick={handleItemClick}>
                <div className="eventInfo">
                    <div className="eventName">
                        {event.name}
                    </div>
                    <div className="eventOwner">
                        {event.ownerFullName}
                    </div>
                    <div className="eventHeldAt">
                        {toLocalDateTimeShort(event.heldAt)}
                    </div>
                </div>
                <div className="mask" />
            </div>
        </div>
    );
};

export default EventItem;
