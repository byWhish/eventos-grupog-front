import { computed, observable, action } from 'mobx';

class Event {
    id = null;
    type = null;
    name = null;
    heldAt = null;
    description = null;
    products = [];
    owner = null;
    @observable guests = [];
    deadline = null;
    latest = null;
    popular = null;
    ongoing = null;

    constructor({
        id, type, name, deadline, heldAt, description, products, guests, owner, ongoing, latest, popular,
    }) {
        this.id = id;
        this.type = type;
        this.name = name;
        this.deadline = new Date(deadline);
        this.heldAt = new Date(heldAt);
        this.description = description;
        this.guests = guests;
        this.products = products;
        this.owner = owner;
        this.type = type;
        this.latest = latest;
        this.popular = popular;
        this.ongoing = ongoing;
    }

    @computed get ownerFullName() {
        return `${this.owner.name} ${this.owner.surname}`;
    }

    @computed get guestsList() {
        return this.guests.map(guest => guest);
    }

    getGuest(id) {
        return this.guests.find(guest => guest.id === id);
    }

    @action addGuestProduct(id, product) {
        const guest = this.getGuest(id);
        if (!guest.products.find(p => p.id === product.id)) guest.products.push(product);
    }

    @action removeGuestProduct(id, product) {
        const guest = this.getGuest(id);
        guest.products = guest.products.filter(p => p.id !== product.id);
    }
}

export default Event;
