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
        this.userIds = Event.extractGuestIds(guests);
        this.products = Event.removeIdsFromProducts(products);
        this.ownerId = 1;
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
}

export default Event;
