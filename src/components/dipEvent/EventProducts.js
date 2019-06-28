import React from 'react';
import ProductsTable from '../newEvent/ProductsTable';

const EventProducts = ({
    items, eventType, addProduct,
}) => {
    let showSelect = false;
    switch (eventType) {
        case 'CommonAccountEvent':
        case 'BasketEvent':
            showSelect = true;
            break;
        case 'MoneyCollectionEvent':
        case 'PartyEvent':
            showSelect = false;
            break;
        default:
    }

    return (
        <div className="listWrapper">
            <ProductsTable items={items} selectItem={addProduct} selectColumn={showSelect} />
        </div>
    );
};

export default EventProducts;
