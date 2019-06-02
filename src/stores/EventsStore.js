import { observable } from 'mobx';
import BaseClient from '../services/BaseClient';
import Event from './Event';
import Logger from '../utils/Logger';

class EventsStore {
    @observable events;

    constructor(Auth) {
        this.auth = Auth;
    }

    saveEvent({ eventInfo, guests, products }) {
        const event = new Event({ eventInfo, guests, products });

        const endpoint = '/events';

        return BaseClient.post(this.auth, endpoint, event)
            .then((response) => {
                Logger.of('saveEvent').trace('response:', response);
            })
            .catch((error) => {
                Logger.of('saveEvent').error('error:', error);
            });
    }
}

export default EventsStore;
