import React, { useContext } from 'react';
import {Redirect, Route} from 'react-router-dom';
import AppContext from "./context";

const renderRouter = (component, ...rest) => {
    const props = Object.assign({}, ...rest);
    return React.createElement(component, props);
};

const PrivateRoute = ({ component, ...rest }) => {
    const { rootStore: { Auth, configStore: { urls } } } = useContext(AppContext);

    if (!Auth.isLoggedIn()) return <Redirect to={{pathname: urls.login}} />;

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
