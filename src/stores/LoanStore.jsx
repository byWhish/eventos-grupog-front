import { observable } from 'mobx';
import BaseClient from '../services/BaseClient';
import Logger from '../utils/Logger';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

class LoanStore {
    @observable loans = [];
    @observable state = STATE_PENDING;
    @observable userId = null;

    constructor(Auth) {
        this.auth = Auth;
    }

    initFetch() {
        this.fetchLoans();
    }

    payLoan(loan) {
        const endpoint = `/api/private/loans/pay/${loan.id}`;

        BaseClient.post(this.auth, endpoint)
            .then((response) => {
                Logger.of('payLoan').trace('response', response);
                this.fetchLoans();
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('payLoan').error('error:', error);
                this.state = STATE_ERROR;
            });
    }

    fetchLoans() {
        const endpoint = `/api/private/loans/all/${2}`;

        BaseClient.get(this.auth, endpoint)
            .then((response) => {
                Logger.of('fetchLoans').trace('response', response);
                this.loans = response;
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('fetchLoans').error('error:', error);
                this.state = STATE_ERROR;
            });
    }
}

export default LoanStore;
