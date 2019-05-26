import React from 'react';
import {Redirect, Route} from 'react-router-dom';

const renderRouter = (component, ...rest) => {
    const props = Object.assign({}, ...rest);
    return React.createElement(component, props);
};

const PrivateRoute = ({ component, urls, ...rest }) => {
    const { Auth } = rest;

    console.log('hola',Auth.isLoggedIn())

    // if (!Auth.isLoggedIn()) return <Redirect to={{pathname: urls.login}} />;

    return (
        <Route
            {...rest}
            render={props => {
                return renderRouter(component, props, rest);
            }}
        />
    );
};

export default PrivateRoute;
