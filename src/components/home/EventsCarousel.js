import React from 'react';
import Slider from 'react-slick';
import EventItem from './EventItem';
import { setting } from './EventsCarouselSettings';
import './EventsCarousel.css';
import EventPlaceHolder from './EventPlaceHolder';

const EventsCarousel = ({ title, events }) => {
    const eventsNode = events.map(e => (
        <EventItem event={e} key={e.id} />
    ));

    if (!events.length) return <EventPlaceHolder title={title} />;

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
