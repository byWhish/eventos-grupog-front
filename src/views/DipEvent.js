import React from 'react';
import EventExpansionPanels from '../components/dipEvent/EventExpansionPanel';
import './DipEvent.css';

const DipEvent = () => (
    <div className="eventContainer">
        <div className="expansionPanelWrapper">
            <EventExpansionPanels />
        </div>
    </div>
);

export default DipEvent;
