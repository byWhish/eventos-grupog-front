import React from 'react';
import './EventsMenu.css';

const EventsMenu = props => {
    return (
        <div className="menuWrapper">
            <img className="menu" alt="" src={'/img/menu.png'} />
            <img className="add" alt="" src={'/img/add.png'} />
        </div>
    )
}

export default EventsMenu;
