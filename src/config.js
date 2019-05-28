export const config = {
    authCallbackUri: process.env.REACT_APP_AUTH_CALLBACK_URI,
    apiUrl: process.env.REACT_APP_API_URL,
    userAllEndpoint: process.env.REACT_APP_USER_ALL,
    defaultRequestTimeout: 5000
};

export const STATE_PENDING = 'pending';
export const STATE_DONE = 'done';
export const STATE_ERROR = 'error';
