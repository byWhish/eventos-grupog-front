import axios from 'axios';
import { config } from '../config';

class BaseClient {

    static get = (endpoint, params = null, timeout = config.defaultRequestTimeout) => {

        const headers = {
            Authorization: null
        };

        return axios.get(endpoint, {params, headers, timeout})
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error:', error);
            })
    };

    static post = (url, data = null, timeout = config.defaultRequestTimeout) => {

        const headers = {
            Authorization: null
        };

        return axios.post(url, data, {headers, timeout})
            .then(response => {

            })
            .catch(error => {

            })
    };


    static getConfig = () => {
        return BaseClient.get('/config/es-AR.json')
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
                throw Error;
            })
    }
}

export default BaseClient;
