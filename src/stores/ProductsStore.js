import { computed, observable } from 'mobx';
import BaseClient from '../services/BaseClient';
import Logger from '../utils/Logger';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

class ProductsStore {
    @observable products = new Map();
    @observable state = STATE_PENDING;

    constructor(Auth) {
        this.auth = Auth;
    }

    processProducts = (products) => {
        products.forEach((product) => {
            this.products.set(product.id, product);
        });
    };

    fetchProducts() {
        const endpoint = '/product/all';

        BaseClient.get(this.auth, endpoint)
            .then((response) => {
                Logger.of('fetchProducts').trace('response', response);
                this.processProducts(response);
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('fetchProducts').error('error:', error);
                this.state = STATE_ERROR;
            });
    }

    @computed get list() {
        return Array.from(this.products).map(([, u]) => u);
    }
}

export default ProductsStore;
