import React from 'react';
import EventExpansionPanels from '../components/newEvent/EventExpansionPanel';
import './NewEvent.css';

const NewEvent = () => (
    <div className="eventContainer">
        <div className="expansionPanelWrapper">
            <EventExpansionPanels />
        </div>
    </div>
);

export default NewEvent;
