class Event {
    type = null;
    name = null;
    description = null;
    products = [];
    userIds = null;
    users = [];
    ownerId = null;
    owner = null;
    deadline = null;

    constructor({ type, name, description, products, userIds, ownerId, deadline }) {
        this.type = type;
        this.name = name;
        this.description = description;
        this.products = products;
        this.userIds = userIds;
        this.ownerId = ownerId;
        this.deadline = deadline;
    }
}

export default Event;
