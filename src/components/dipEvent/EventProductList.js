import React from 'react';
import AutoCompleteList from './AutoCompleteList';
import './EventGuestList.css';
import ProductsTable from './ProductsTable';


const EventProductList = ({ products, setProducts, handleOnSelectProduct }) => {
    const productsPlaceHolder = 'Busca un producto';
    const templatePlaceHolder = 'Busca un template';
    return (
        <div className="guestListWrapper">
            <AutoCompleteList onSelectItem={handleOnSelectProduct} placeHolder={templatePlaceHolder} />
            <AutoCompleteList onSelectItem={handleOnSelectProduct} placeHolder={productsPlaceHolder} />
            <ProductsTable items={products} setItems={setProducts} />
        </div>
    );
};

export default EventProductList;
