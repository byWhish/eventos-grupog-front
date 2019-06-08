import React, { useContext, useEffect, useState } from 'react';
import AutoCompleteList from './AutoCompleteList';
import './EventGuestList.css';
import ProductsTable from './ProductsTable';
import AppContext from '../../utils/context';
import ModalTemplate from './ModalTemplate';
import ProductDetail from './ProductDetail';

const EventProductList = ({
    items, setItems, handleOnSelectProduct, handleOnSelectTemplate,
}) => {
    const [open, setOpen] = useState(false);
    const [template, setTemplate] = useState(null);
    const value = useContext(AppContext);
    const [product, setProduct] = useState({});
    const { rootStore: { productStore } } = value;
    const { productSuggestions, templateSuggestions } = productStore;
    const productsPlaceHolder = 'Busca un producto';
    const templatePlaceHolder = 'Busca un template';

    const fetchProducts = () => {
        productStore.initFetch();
    };

    useEffect(fetchProducts, []);

    const onSelectTemplate = (template) => {
        setTemplate(template);
        setOpen(true);
    };

    const handleSetProduct = (product) => {
        handleOnSelectProduct(product);
        setProduct({
            name: '',
            price: '',
            amountLimit: '',
        });
    };

    const onAccept = () => {
        handleOnSelectTemplate(template);
        setOpen(false);
    };

    const onCancel = () => {
        setOpen(false);
    };

    return (
        <div className="guestListWrapper">
            <AutoCompleteList options={templateSuggestions} onSelectItem={onSelectTemplate} placeHolder={templatePlaceHolder} />
            <AutoCompleteList options={productSuggestions} onSelectItem={setProduct} placeHolder={productsPlaceHolder} />
            <ProductDetail product={product} setProduct={handleSetProduct} />
            <ProductsTable items={items} setItems={setItems} setProduct={setProduct} editColumn deleteColumn />
            <ModalTemplate open={open} onAccept={onAccept} onCancel={onCancel} template={template} />
        </div>
    );
};

export default EventProductList;
