import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';

const Card = ({ classes, cardInfo, setCardInfo }) => {
    const handleInputChange = key => (event) => {
        const prevInfo = { ...cardInfo };
        prevInfo[key] = event.target.value;
        setCardInfo(prevInfo);
    };

    return (
        <div className="cardWrapper">
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Numero"
                    className={classes.textField}
                    value={cardInfo.number}
                    onChange={handleInputChange('number')}
                    margin="normal"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Nombre"
                    className={classes.textField}
                    value={cardInfo.name}
                    onChange={handleInputChange('name')}
                    margin="normal"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Expiracion"
                    className={classes.textField}
                    value={cardInfo.expiry}
                    onChange={handleInputChange('expiry')}
                    margin="normal"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Cvc"
                    className={classes.textField}
                    value={cardInfo.cvc}
                    onChange={handleInputChange('cvc')}
                    margin="normal"
                />
            </FormControl>
        </div>
    );
};

export default Card;
