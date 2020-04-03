import { computed, observable, action } from 'mobx';
import BaseClient from '../services/BaseClient';
import Event from './Event';
import Logger from '../utils/Logger';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

class EventsStore {
    @observable events = new Map();
    @observable state = null;
    @observable saveState = null;
    @observable eventState = null;
    @observable confirState = null;
    userId = null;

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
                this.userId = response.id;
                this.auth.userId = this.userId;
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('init').error('error:', error);
                this.state = STATE_ERROR;
            });
    }


    static extractGuestIds(guests) {
        return guests.map(guest => guest.id);
    }

    static removeIdsFromProducts(products) {
        return products.map((product) => {
            delete product.id;
            return product;
        });
    }

    static processNewEvent({
        products, guests, owner, ...rest
    }) {
        return {
            ...rest, products: EventsStore.removeIdsFromProducts(products), guests: EventsStore.extractGuestIds(guests), ownerId: owner.id,
        };
    }

    saveEvent({
        eventInfo, guests, products, owner,
    }) {
        this.saveState = STATE_PENDING;
        const event = EventsStore.processNewEvent({
            ...eventInfo, guests, products, owner,
        });

        const endpoint = '/api/private/events';

        return BaseClient.post(this.auth, endpoint, event)
            .then((response) => {
                Logger.of('saveEvent').trace('response:', response);
                this.saveState = STATE_DONE;
                return response;
            })
            .catch((error) => {
                Logger.of('saveEvent').error('error:', error);
                this.saveState = STATE_ERROR;
            });
    }

    fetchEvent(id) {
        this.eventState = STATE_PENDING;
        const endpoint = `/api/private/events/${id}`;

        return BaseClient.get(this.auth, endpoint)
            .then((response) => {
                this.eventState = STATE_DONE;
                return response;
            })
            .catch((error) => {
                Logger.of('fetchEvent').error('error:', error);
                this.eventState = STATE_ERROR;
            });
    }

    fethcGuestAmountToPay(event, guest) {
        const endpoint = `/api/private/amountToPay/${guest.id}`;

        return BaseClient.get(this.auth, endpoint)
            .then((response) => {
                Logger.of('fethcGuestAmountToPay').trace('response:', response);
                return response;
            })
            .catch((error) => {
                Logger.of('fethcGuestAmountToPay').error('error:', error);
            });
    }

    @action fetchPopularEvents() {
        const endpoint = '/api/private/events/popular';

        return BaseClient.get(this.auth, endpoint)
            .then((response) => {
                this.processEvents(response, { popular: true });
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
                this.processEvents(response, { latest: true });
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
                this.processEvents(response, { ongoing: true });
                Logger.of('fetchOngoingEvents').trace('endpoint:', endpoint, 'response:', response);
            })
            .catch((error) => {
                Logger.of('fetchOngoingEvents').error('endpoint:', endpoint, 'error:', error);
            });
    }

    processEvents(events, type) {
        events.forEach((event) => {
            const finded = this.events.get(event.id);
            if (finded) this.events.set(event.id, new Event({ ...finded, ...event, ...type }));
            else this.events.set(event.id, new Event({ ...event, ...type }));
        });
    }

    @computed get popularList() {
        return Array.from(this.events).map(([, p]) => p).filter(p => p.popular);
    }

    @computed get latestList() {
        return Array.from(this.events).map(([, l]) => l).filter(p => p.latest);
    }

    @computed get ongoingList() {
        return Array.from(this.events).map(([, o]) => o).filter(p => p.ongoing);
    }

    getEvent(id) {
        const event = this.events.get(parseInt(id, 10));
        if (event) {
            this.eventState = STATE_DONE;
            return event;
        }
        return this.fetchEvent(id);
    }

    getEventGuest(id) {
        return this.getEvent(id).guests.find(guest => guest.user.id === this.userId);
    }


    postGuestConfirm(id) {
        this.confirState = STATE_PENDING;
        const endpoint = `/api/private/confirmAssistance/${id}`;

        return BaseClient.post(this.auth, endpoint)
            .then((response) => {
                this.confirState = STATE_DONE;
                const { event } = response;
                const findedGuest = this.getEventGuest(event.id);
                findedGuest.confirmedAssistance = true;
            })
            .catch((error) => {
                this.confirState = STATE_ERROR;
                Logger.of('fetchGuestConfirm').error('error:', error);
            });
    }

    postGuestPayment(id) {
        this.paymentState = STATE_PENDING;
        const endpoint = `/api/private/payEvent/${id}`;

        return BaseClient.post(this.auth, endpoint)
            .then((response) => {
                this.paymentState = STATE_DONE;
                return response;
            })
            .catch((error) => {
                this.paymentState = STATE_ERROR;
                Logger.of('postGuestPayment').error('error:', error);
            });
    }

    fetchGuestPayment(id, amount) {
        this.paymentState = STATE_PENDING;

        const data = {
            amount,
        };

        const endpoint = `/api/private/pay/${id}`;
        return BaseClient.post(this.auth, endpoint, data)
            .then((response) => {
                this.paymentState = STATE_DONE;
                Logger.of('fetchGuestPayment').trace('response:', response);
                return response;
            })
            .catch((error) => {
                Logger.of('fetchGuestPayment').error('errpr:', error);
                this.paymentState = STATE_ERROR;
            });
    }

    static fetchGuestConfirmPublic(guestHash) {
        const endpoint = '/api/public/confirmAssistance';
        const params = {
            hash: guestHash,
        };

        return BaseClient.postPublic(endpoint, null, null, params)
            .then(response => response)
            .catch((error) => {
                Logger.of('fetchGuestConfirm').error('error:', error);
            });
    }
}

export default EventsStore;
