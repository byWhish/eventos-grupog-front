const Auth0 = (props) => {
    const { Auth } = props;
    const handleAuthentication = (nextState, replace) => {
        if (/access_token|id_token|error/.test(nextState.location.hash)) {
            Auth.handleAuthentication();
        }
    }
    handleAuthentication(props);
    return null
};

export default Auth0;
