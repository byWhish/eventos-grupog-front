import React from 'react';

const EventPlaceHolder = ({ title }) => (
    <div className="carouselWrapper">
        <div className="carouselHeader">
            {title}
        </div>
        <div className="sliderWrapper">
            <div className="content-placeholder-background" />
        </div>
    </div>
);

export default EventPlaceHolder;
