import { observable } from 'mobx';

class EventsStore {
    @observable events;

    constructor(Auth) {
        this.auth = Auth;
    }
}

export default EventsStore;
