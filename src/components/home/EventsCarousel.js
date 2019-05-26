import React from 'react';
import Slider from "react-slick";
import EventItem from "./EventItem";
import './EventsCarousel.css';


const StripeNextArrow = ({ className, style, onClick }) => {
    /* istanbul ignore next */
    const handleOnClick = () => {
        onClick();
        setTimeout(() => {
            document.documentElement.scrollTop += 1;
            document.documentElement.scrollTop -= 1;
        }, 300);
    };

    return (
        <div className={`${className} vertical-align`} style={{ ...style, display: 'flex' }} role="button" tabIndex={0} onClick={handleOnClick}>
            <img src={'/img/arrowRight.svg'} className="arrowImg" alt="next" />
        </div>
    );
};

const StripePrevArrow = ({ className, style, onClick }) => {
    /* istanbul ignore next */
    const handleOnClick = () => {
        onClick();
        setTimeout(() => {
            document.documentElement.scrollTop += 1;
            document.documentElement.scrollTop -= 1;
        }, 300);
    };

    return (
        <div className={`${className} vertical-align`} style={{ ...style, display: 'flex' }} role="button" tabIndex={0} onClick={handleOnClick}>
            <img src={'/img/arrowLeft.svg'} className="arrowImg" alt="next" />
        </div>
    );
};

const setting = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <StripeNextArrow />,
    prevArrow: <StripePrevArrow />
};

const EventsCarousel = ({ title, events }) => {
    const eventsNode = events.map( e => (
        <EventItem event={e} key={e.id} />
    ));

    return (
        <div className="carouselWrapper">
            <div className="carouselHeader">
                {title}
            </div>
            <Slider {...setting} >
                {eventsNode}
            </Slider>
        </div>
    )
};

export default EventsCarousel;
