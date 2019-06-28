import React from 'react';
import ProductsTable from '../newEvent/ProductsTable';

const GuestProducts = ({
    items, eventType, removeProduct, setOpen,
}) => {
    switch (eventType) {
        case 'CommonAccountEvent':
        case 'BasketEvent':
            return (
                <div className="listWrapper">
                    <ProductsTable items={items} deleteItem={removeProduct} deleteColumn setOpen={setOpen} />
                </div>
            );
        case 'PartyEvent':
        case 'MoneyCollectionEvent':
            return null;
        default:
            return null;
    }
};

export default GuestProducts;
