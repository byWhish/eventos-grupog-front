import auth0 from 'auth0-js';
import history from '../utils/History';
import Logger from '../utils/Logger';
import { config } from '../config';

export default class Auth {
    userProfile;
    auth0 = new auth0.WebAuth({
        domain: 'bywhish.auth0.com',
        clientID: 'OlXk8kUjCFU3DNYt6129nMCRxwOXGMAh',
        redirectUri: config.authCallbackUri,
        responseType: 'token id_token',
        scope: 'openid profile'
    });
    accessToken;
    idToken;
    expiresAt;

    login() {
        this.auth0.authorize();
    }

    isLoggedIn() {
        return this.idToken;
    }

    getProfile(callBack) {
        this.auth0.client.userInfo(this.accessToken, (err, profile) => {
            if (profile) {
                this.userProfile = profile;
                Logger.of('getProfile').trace('result:', profile);
            }
            callBack(err, profile);
        });
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                Logger.of('handleAuthentication').trace('result:', authResult);
                console.log('hola 1', this.idToken)
                history.replace('/home');
            } else if (err) {
                Logger.of('handleAuthentication').error('error:', err);
                alert(`Error: ${err.error}. Check the console for further details.`);
            }
        });
    }

    getAccessToken() {
        return this.accessToken;
    }

    getIdToken() {
        return this.idToken;
    }

    setSession(authResult) {
        // Set isLoggedIn flag in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Set the time that the Access Token will expire at
        let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.accessToken = authResult.accessToken;
        this.idToken = authResult.idToken;
        this.expiresAt = expiresAt;

        // navigate to the home route
        history.replace('/home');
    }

    renewSession() {
        this.auth0.checkSession({}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
            } else if (err) {
                this.logout();
                console.log(err);
                alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
            }
        });
    }

    logout() {
        // Remove tokens and expiry time
        this.accessToken = null;
        this.idToken = null;
        this.expiresAt = 0;

        // Remove isLoggedIn flag from localStorage
        localStorage.removeItem('isLoggedIn');

        this.auth0.logout({
            returnTo: window.location.origin
        });

        // navigate to the home route
        history.replace('/home');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = this.expiresAt;
        return new Date().getTime() < expiresAt;
    }
}
