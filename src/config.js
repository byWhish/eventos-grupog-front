export const config = {
    authCallbackUri: process.env.REACT_APP_AUTH_CALLBACK_URI,
    apiUrl: 'http://localhost:8080',
    defaultRequestTimeout: 5000
};

export const STATE_PENDING = 'pending';
export const STATE_DONE = 'done';
export const STATE_ERROR = 'error';
