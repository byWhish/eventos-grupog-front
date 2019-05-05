import React from 'react';
import Loading from './Loading';

const Auth0 = (props) => {
    const { Auth } = props;
    const handleAuthentication = (nextState, replace) => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            Auth.handleAuthentication();
        }
    }
    handleAuthentication(props);
    return <Loading />
};

export default Auth0;
