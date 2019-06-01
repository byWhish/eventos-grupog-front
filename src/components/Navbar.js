import React from 'react';
import UserProfile from './userProfile/UserProfile';
import './Navbar.css';
import EventsMenu from './EventsMenu';

const NavBar = () => (
    <div className="eventsNavBar">
        <EventsMenu />
        <UserProfile />
    </div>
);

export default NavBar;
