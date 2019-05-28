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
    centerMode: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <StripeNextArrow />,
    prevArrow: <StripePrevArrow />,
    responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,

                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: .5,
                },
            },
        ]
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
