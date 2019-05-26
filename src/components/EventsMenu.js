import React from 'react';
import history from '../utils/History';
import './EventsMenu.css';

const EventsMenu = () => {
    const handleNewEvent = () => {
        history.push('/event')
    };
    return (
        <div className="menuWrapper">
            <img className="menu" alt="" src={'/img/menu.png'} />
            <img className="add" alt="" src={'/img/add.png'} onClick={handleNewEvent} />
        </div>
    )
}

export default EventsMenu;
