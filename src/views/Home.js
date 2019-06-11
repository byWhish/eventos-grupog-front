import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { events } from '../mocks/events';
import EventsCarousel from '../components/home/EventsCarousel';
import './Home.css';
import NavBar from '../components/Navbar';
import AppContext from '../utils/context';

const Home = observer(() => {
    const value = useContext(AppContext);
    const { rootStore: { eventStore } } = value;
    const { popularList, ongoingList, latestList } = eventStore;
    const fetchEvents = () => {
        eventStore.fetchPopularEvents();
        eventStore.fetchLatestEvents(2);
        eventStore.fetchOngoingEvents(2);
    };
    useEffect(fetchEvents, []);
    return (
        <div className="home">
            <NavBar />
            <EventsCarousel title="Mis proximos eventos" events={ongoingList} />
            <EventsCarousel title="Eventos mas populares" events={popularList} />
            <EventsCarousel title="Mis eventos pasados" events={latestList} />
        </div>
    );
});

export default Home;
