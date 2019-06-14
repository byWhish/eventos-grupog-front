import { computed, observable, action } from 'mobx';
import BaseClient from '../services/BaseClient';
import Event from './Event';
import Logger from '../utils/Logger';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

class EventsStore {
    @observable popularEvents = new Map();
    @observable latestEvents = new Map();
    @observable onGoingEvents = new Map();
    @observable state = null;

    constructor(Auth) {
        this.auth = Auth;
    }

    init(userStore) {
        this.state = STATE_PENDING;
        userStore.authenticate()
            .then((response) => {
                Logger.of('init').trace('response:', response);
                this.fetchPopularEvents();
                this.fetchLatestEvents(response.id);
                this.fetchOngoingEvents(response.id);
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('init').error('error:', error);
                this.state = STATE_ERROR;
            });
    }

    saveEvent({ eventInfo, guests, products }) {
        this.state = STATE_PENDING;
        const event = new Event({ eventInfo, guests, products });

        const endpoint = '/api/private/events';

        return BaseClient.post(this.auth, endpoint, event)
            .then((response) => {
                Logger.of('saveEvent').trace('response:', response);
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('saveEvent').error('error:', error);
                this.state = STATE_ERROR;
            });
    }

    @action fetchPopularEvents() {
        const endpoint = '/api/private/events/popular';

        return BaseClient.get(this.auth, endpoint)
            .then((response) => {
                this.processEvents(response, this.popularEvents);
                Logger.of('fetchPopularEvents').trace('endpoint:', endpoint, 'response:', response);
            })
            .catch((error) => {
                Logger.of('fetchPopularEvents').error('endpoint:', endpoint, 'error:', error);
            });
    }

    @action fetchLatestEvents(id) {
        const endpoint = `/api/private/events/lastest/${id}`;

        return BaseClient.get(this.auth, endpoint)
            .then((response) => {
                this.processEvents(response, this.latestEvents);
                Logger.of('fetchLatestEvents').trace('endpoint:', endpoint, 'response:', response);
            })
            .catch((error) => {
                Logger.of('fetchLatestEvents').error('endpoint:', endpoint, 'error:', error);
            });
    }

    @action fetchOngoingEvents(id) {
        const endpoint = `/api/private/events/ongoing/${id}`;

        return BaseClient.get(this.auth, endpoint)
            .then((response) => {
                this.processEvents(response, this.onGoingEvents);
                Logger.of('fetchOngoingEvents').trace('endpoint:', endpoint, 'response:', response);
            })
            .catch((error) => {
                Logger.of('fetchOngoingEvents').error('endpoint:', endpoint, 'error:', error);
            });
    }

    processEvents(events, eventMap) {
        events.forEach((event) => {
            eventMap.set(event.id, event);
        });
    }

    @computed get popularList() {
        return Array.from(this.popularEvents).map(([, p]) => p);
    }

    @computed get latestList() {
        return Array.from(this.latestEvents).map(([, l]) => l);
    }

    @computed get ongoingList() {
        return Array.from(this.onGoingEvents).map(([, o]) => o);
    }
}

export default EventsStore;
