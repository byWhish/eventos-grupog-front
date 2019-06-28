import React from 'react';
import RequestLoan from './RequestLoan';
import Other from './Other';
import Card from './Card';

const PaymentForm = ({
    type, userStore, classes, cardInfo, setCardInfo, operation, setOperation,
}) => {
    switch (type) {
        case 'card':
            return <Card classes={classes} cardInfo={cardInfo} setCardInfo={setCardInfo} />;
        case 'loan':
            return <RequestLoan userStore={userStore} />;
        case 'other':
            return <Other operation={operation} setOperation={setOperation} classes={classes} />;
        default:
            return null;
    }
};

export default PaymentForm;
