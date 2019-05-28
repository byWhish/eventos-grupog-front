import {computed, observable} from "mobx";
import BaseClient from "../services/BaseClient";
import Logger from "../utils/Logger";
import {STATE_DONE, STATE_ERROR, STATE_PENDING} from "../config";

class UsersStore {

    @observable users = new Map();
    @observable state = STATE_PENDING;

    constructor(Auth) {
        this.auth = Auth;
    }

    processUsers = users => {
        users.forEach( user => {
            this.users.set(user.email, user);
        })
    };

    fetchUsers() {
        const endpoint = '/user/all';


        BaseClient.get(this.auth, endpoint)
            .then(response => {
                Logger.of('fetchUsers').trace('response', response);
                this.processUsers(response);
                this.state = STATE_DONE;
            })
            .catch( error => {
                Logger.of('fetchUsers').error('error:', error);
                this.state = STATE_ERROR;
            })
    }

    @computed get list() {
        console.log('hola', this.users)
        return Array.from(this.users).map(([, u]) => u);
    }

    @computed get userSuggestions() {
        return this.list.map(user => ({value: user.email, label: `${user.name} ${user.surname}`}))
    }
}

export default UsersStore;
