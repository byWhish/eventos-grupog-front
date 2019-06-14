import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import EventsCarousel from '../components/home/EventsCarousel';
import './Home.css';
import NavBar from '../components/Navbar';
import AppContext from '../utils/context';
import { STATE_PENDING } from '../config';
import Loading from '../components/Loading';

const Home = observer(() => {
    const value = useContext(AppContext);
    const { rootStore: { eventStore, userStore, Auth } } = value;
    const { popularList, ongoingList, latestList } = eventStore;

    const profileCallBack = (error, profile) => {
        if (profile) eventStore.init(userStore);
    };

    const fetchUserInfo = () => {
        Auth.getProfile(profileCallBack);
    };

    useEffect(fetchUserInfo, []);

    if (userStore.state === STATE_PENDING) return <Loading />;

    return (
        <div className="home">
            <NavBar userProfle={Auth.userProfile} />
            <EventsCarousel title="Mis proximos eventos" events={ongoingList} />
            <EventsCarousel title="Eventos mas populares" events={popularList} />
            <EventsCarousel title="Mis eventos pasados" events={latestList} />
        </div>
    );
});

export default Home;
