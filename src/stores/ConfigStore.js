import { observable } from 'mobx';
import BaseClient from '../services/BaseClient';
import {
    STATE_DONE, STATE_ERROR, STATE_PENDING, config,
} from '../config';
import Logger from '../utils/Logger';

class ConfigStore {
    @observable state = STATE_PENDING;

    constructor() {
        this.urls = null;
        this.config = config;
        this.fetchConfig();
    }

    fetchConfig() {
        BaseClient.getConfig()
            .then((response) => {
                const { config } = response;
                this.urls = config.urls;
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('fetchConfig').error('error', error);
                this.state = STATE_ERROR;
            });
    }
}

export default ConfigStore;
