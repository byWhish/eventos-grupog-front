import BaseClient from '../services/BaseClient'
import {observable} from "mobx";
import {STATE_DONE, STATE_ERROR, STATE_PENDING, config} from "../config";

class ConfigStore {

    @observable state = STATE_PENDING;

    constructor(){
        this.urls = null;
        this.config = config;
        this.fetchConfig();
    }

    fetchConfig(){
        BaseClient.getConfig()
            .then(response => {
                const { config } = response;
                this.urls = config.urls;
                this.state = STATE_DONE;
            })
            .catch((error) => {
                console.log(error);
                this.state = STATE_ERROR;
            })
    }
}

export default ConfigStore;
