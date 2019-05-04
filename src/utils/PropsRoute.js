import React from 'react';
import { Route } from 'react-router-dom';

const renderRouter = (component, ...rest) => {
    const props = Object.assign({}, ...rest);
    return React.createElement(component, props);
};

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return renderRouter(component, props, rest);
            }}
        />
    );
};

export default PropsRoute;
