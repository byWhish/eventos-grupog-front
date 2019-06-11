import { computed, observable, when } from 'mobx';
import BaseClient from '../services/BaseClient';
import Logger from '../utils/Logger';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

class UsersStore {
    @observable users = new Map();
    @observable state = null;
    @observable user = null;

    constructor(Auth) {
        this.auth = Auth;
    }

    processUsers = (users) => {
        users.forEach((user) => {
            this.users.set(user.id, user);
        });
    };

    authenticate() {
        this.state = STATE_PENDING;
        const data = { ...this.auth.userProfile };
        const endpoint = '/api/private/user/auth';
        return BaseClient.post(this.auth, endpoint, data)
            .then((response) => {
                Logger.of('authenticate').trace('endpoint:', endpoint, 'response:', response);
                this.user = response;
                this.state = STATE_DONE;
                return response;
            })
            .catch((error) => {
                this.state = STATE_ERROR;
                Logger.of('authenticate').error('error', error);
            });
    }

    fetchUsers() {
        this.state = STATE_PENDING;
        const endpoint = '/api/private/user/all';
        BaseClient.get(this.auth, endpoint)
            .then((response) => {
                Logger.of('fetchUsers').trace('response', response);
                this.processUsers(response);
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('fetchUsers').error('error:', error);
                this.state = STATE_ERROR;
            });
    }

    @computed get list() {
        return Array.from(this.users).map(([, u]) => u);
    }

    @computed get userSuggestions() {
        return this.list.map(user => ({ value: user, label: `${user.name} ${user.surname}` }));
    }
}

export default UsersStore;
