import React, { useEffect, useState } from 'react';
import * as queryString from 'query-string';
import EventsStore from '../stores/EventsStore';
import Loading from '../components/Loading';

const Assist = ({ location }) => {
    const { search } = location;
    const queryParams = queryString.parse(search);
    const [confirm, setConfirm] = useState(null);

    const fetchGuestConfirm = guestHash => () => {
        EventsStore.fetchGuestConfirmPublic(guestHash)
            .then((response) => {
                setConfirm(response);
            });
    };

    useEffect(fetchGuestConfirm(queryParams.hash), []);

    if (confirm === null) return <Loading />;

    const { event, guest } = confirm;

    return (
        <div className="confirmWrapper">
            <div className="eventInfo">
                {event.name}
            </div>
            <div className="guestInfo">
                {guest.user.name}
            </div>
        </div>
    );
};

export default Assist;
