import React from 'react';

export const StripeNextArrow = ({ className, style, onClick }) => {
    const handleOnClick = () => {
        onClick();
    };

    return (
        <div className={`${className} vertical-align`} style={{ ...style, display: 'flex' }} role="button" tabIndex={0} onClick={handleOnClick}>
            <img src="/img/arrowRight.svg" className="arrowImg" alt="next" />
        </div>
    );
};

export const StripePrevArrow = ({ className, style, onClick }) => {
    const handleOnClick = () => {
        onClick();
    };

    return (
        <div className={`${className} vertical-align`} style={{ ...style, display: 'flex' }} role="button" tabIndex={0} onClick={handleOnClick}>
            <img src="/img/arrowLeft.svg" className="arrowImg" alt="next" />
        </div>
    );
};

export const setting = {
    infinite: true,
    centerMode: false,
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
                slidesToScroll: 1,
            },
        },
    ],
};
