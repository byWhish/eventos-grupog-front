import React from 'react';
import AutoCompleteGuest from "./AutoCompleteGuest";
import './EventGuestList.css'
import GuestsTable from "./GuestsTable";

const EventGuestList = () => {
    return (
        <div className="guestListWrapper">
            <AutoCompleteGuest />
        </div>
    )
}

export default EventGuestList;
