import React, { useContext } from 'react';
import Loading from './Loading';
import AppContext from "../utils/context";

const Auth0 = (props) => {
    const value = useContext(AppContext);
    const { rootStore: { Auth } } = value;
    const handleAuthentication = (nextState, replace) => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            Auth.handleAuthentication();
        }
    }
    handleAuthentication(props);
    return <Loading />
};

export default Auth0;
