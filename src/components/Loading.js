import React from 'react';
import './Loading.css';
import loading from './loading.gif';

const Loading = () => (
    <div className="loading">
        <img alt="Loading..." src={loading} />
        <span>Loading...</span>
    </div>
);

export default Loading;
