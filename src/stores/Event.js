class Event {
    type = null;
    name = null;
    heldAt = null;
    description = null;
    products = [];
    userIds = null;
    ownerId = null;
    deadline = null;

    constructor({ eventInfo, products, guests }) {
        this.type = eventInfo.type;
        this.name = eventInfo.name;
        this.deadline = eventInfo.deadline;
        this.heldAt = eventInfo.heldAt;
        this.description = eventInfo.description;
        this.userIds = this.extractGuestIds(guests);
        this.products = this.removeIdsFromProducts(products);
        this.ownerId = 1;
    }

    extractGuestIds(guests) {
        return guests.map(guest => guest.id);
    }

    removeIdsFromProducts(products) {
        return products.map((product) => {
            delete product.id;
            return product;
        });
    }
}

export default Event;
