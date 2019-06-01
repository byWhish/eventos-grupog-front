import React from 'react';
import { events } from '../mocks/events';
import EventsCarousel from '../components/home/EventsCarousel';
import './Home.css';
import NavBar from '../components/Navbar';

const Home = () => (
    <div className="home">
        <NavBar />
        <EventsCarousel title="Mis proximos eventos" events={events} />
        <EventsCarousel title="Eventos mas populares" events={events} />
        <EventsCarousel title="Mis eventos pasados" events={events} />
    </div>
);

export default Home;
