import { computed, observable, action } from 'mobx';
import BaseClient from '../services/BaseClient';
import Event from './Event';
import Logger from '../utils/Logger';

class EventsStore {
    @observable popularEvents = new Map();
    @observable latestEvents = new Map();
    @observable onGoingEvents = new Map();

    constructor(Auth) {
        this.auth = Auth;
    }

    saveEvent({ eventInfo, guests, products }) {
        const event = new Event({ eventInfo, guests, products });

        const endpoint = '/api/private/events';

        return BaseClient.post(this.auth, endpoint, event)
            .then((response) => {
                Logger.of('saveEvent').trace('response:', response);
            })
            .catch((error) => {
                Logger.of('saveEvent').error('error:', error);
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
