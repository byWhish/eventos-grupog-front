import React, { useState } from 'react';
import AutoCompleteGuest from "./AutoCompleteGuest";
import './EventGuestList.css'
import GuestsTable from "./GuestsTable";

const EventGuestList = () => {

    const [items, setItems] = useState([]);

    const handleOnSelectItem = (item) => {
           setItems([...items, item]);
    };

    return (
        <div className="guestListWrapper">
            <AutoCompleteGuest onSelectItem={handleOnSelectItem}/>
            <GuestsTable items={items} setItems={setItems} />
        </div>
    )
}

export default EventGuestList;
