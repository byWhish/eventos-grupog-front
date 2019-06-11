import React from 'react';
import Slider from 'react-slick';
import EventItem from './EventItem';
import { setting } from './EventsCarouselSettings';
import './EventsCarousel.css';

const EventsCarousel = ({ title, events }) => {
    const eventsNode = events.map(e => (
        <EventItem event={e} key={e.id} />
    ));

    return (
        <div className="carouselWrapper">
            <div className="carouselHeader">
                {title}
            </div>
            <div className="sliderWrapper">
                <Slider {...setting}>
                    {eventsNode}
                </Slider>
            </div>
        </div>
    );
};

export default EventsCarousel;
