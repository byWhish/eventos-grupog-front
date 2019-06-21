import { observable } from 'mobx';
import detectLang from 'detect-browser-language';
import BaseClient from '../services/BaseClient';
import {
    STATE_DONE, STATE_ERROR, STATE_PENDING, config,
} from '../config';
import Logger from '../utils/Logger';

class ConfigStore {
    @observable state = null;
    @observable currentLang = null;
    @observable urls = null;
    @observable lang = null;

    constructor() {
        this.urls = null;
        this.config = config;
        this.restoreLanguage();
    }

    restoreLanguage() {
        const lang = localStorage.getItem('lang');
        if (!lang) {
            this.currentLang = detectLang() || 'es';
        }
    }

    fetchConfig() {
        this.state = STATE_PENDING;
        BaseClient.getConfig(this.currentLang)
            .then((response) => {
                const { config } = response;
                this.urls = config.urls;
                this.lang = config.lang;
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('fetchConfig').error('error', error);
                this.state = STATE_ERROR;
            });
    }

    fetchGeoLocation() {
        BaseClient.getGeoLocation()
            .then(response => {
            })
            .catch(error => {
            });
    }
}

export default ConfigStore;
