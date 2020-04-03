import React from 'react';
import history from '../utils/History';
import './EventsMenu.css';

const EventsMenu = () => {
    const handleNewEvent = () => {
        history.push('/event');
    };

    const handleLoansEvent = () => {
        history.push('/loans');
    };

    return (
        <div className="menuWrapper">
            <img className="menu" alt="" src="/img/menu.png" />
            <img className="add" alt="" src="/img/add.png" onClick={handleNewEvent} />
            <img className="add" alt="" src="/img/money.png" onClick={handleLoansEvent} />
        </div>
    );
};

export default EventsMenu;
