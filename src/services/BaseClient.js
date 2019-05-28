import axios from 'axios';
import { config } from '../config';

class BaseClient {

    static get = (auth, endpoint, params = null, timeout = config.defaultRequestTimeout) => {

        const headers = {
            Authorization: auth.getIdToken(),
        };

        // const apiEndpoint = `${config.apiUrl}${endpoint}`;

        return axios.get(endpoint, {params, headers, timeout})
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error:', error);
            })
    };

    static post = (auth, endpoint, data = null, timeout = config.defaultRequestTimeout) => {

        const headers = {
            Authorization: auth.getIdToken(),
        };

        return axios.post(config.apiUrl + endpoint, data, {headers, timeout})
            .then(response => {

            })
            .catch(error => {

            })
    };


    static getConfig = () => {
        return axios.get('/config/es-AR.json')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log(error);
                throw Error;
            })
    }
}

export default BaseClient;
