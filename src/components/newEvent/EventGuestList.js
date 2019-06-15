import React, { useContext, useEffect } from 'react';
import AutoCompleteList from './AutoCompleteList';
import './EventGuestList.css';
import GuestsTable from './GuestsTable';
import AppContext from '../../utils/context';

const EventGuestList = ({ items, setItems, handleOnSelectGuest }) => {
    const value = useContext(AppContext);
    const { rootStore: { userStore } } = value;
    const { userSuggestions } = userStore;
    const placeHolder = 'Busca un usuario';

    const fetchUsers = () => {
        userStore.fetchUsers();
    };

    useEffect(fetchUsers, []);

    return (
        <div className="guestListWrapper">
            <AutoCompleteList options={userSuggestions} onSelectItem={handleOnSelectGuest} placeHolder={placeHolder} />
            <GuestsTable items={items} setItems={setItems} />
        </div>
    );
};

export default EventGuestList;
