import { computed, observable } from 'mobx';
import BaseClient from '../services/BaseClient';
import Logger from '../utils/Logger';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

class ProductsStore {
    @observable products = new Map();
    @observable templates = new Map();
    @observable state = STATE_PENDING;

    constructor(Auth) {
        this.auth = Auth;
    }

    processProducts = (products) => {
        products.forEach((product) => {
            this.products.set(product.id, product);
        });
    };

    processTemplates = (templates) => {
        templates.forEach((template) => {
            this.templates.set(template.id, template);
        });
    }

    initFetch() {
        this.fetchProducts();
        this.fetchTemplates();
    }

    fetchProducts() {
        const endpoint = '/api/private/product/all';

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

    fetchTemplates() {
        const endpoint = '/api/private/product/templates';

        BaseClient.get(this.auth, endpoint)
            .then((response) => {
                Logger.of('fetchTemplates').trace('response', response);
                this.processTemplates(response);
                this.state = STATE_DONE;
            })
            .catch((error) => {
                Logger.of('fetchTemplates').error('error:', error);
                this.state = STATE_ERROR;
            });
    }

    @computed get productList() {
        return Array.from(this.products).map(([, p]) => p);
    }

    @computed get templateList() {
        return Array.from(this.templates).map(([, t]) => t);
    }

    @computed get productSuggestions() {
        return this.productList.map(product => ({ value: product, label: `${product.name}` }));
    }

    @computed get templateSuggestions() {
        return this.templateList.map(template => ({ value: template, label: `${template.name}` }));
    }
}

export default ProductsStore;
