import axios from 'axios';
import { config } from '../config';
import Logger from '../utils/Logger';

class BaseClient {
    static get = (auth, endpoint, params = null, timeout = config.defaultRequestTimeout) => {
        const headers = {
            Authorization: auth.getIdToken(),
        };

        return axios.get(config.apiUrl + endpoint, { params, headers, timeout })
            .then(response => response.data)
            .catch((error) => {
                Logger.of('get').error('error:', error);
            });
    };

    static post = (auth, endpoint, data = null, timeout = config.defaultRequestTimeout) => {
        const headers = {
            Authorization: auth.getIdToken(),
        };

        return axios.post(config.apiUrl + endpoint, data, { headers, timeout })
            .then((response) => {
                Logger.of('post').error('response:', response);
            })
            .catch((error) => {
                Logger.of('post').error('error:', error);
            });
    };


    static getConfig = () => axios.get('/config/es-AR.json')
        .then(response => response.data)
        .catch((error) => {
            Logger.of('getConfig').error('error:', error);
            throw Error;
        })
}

export default BaseClient;
