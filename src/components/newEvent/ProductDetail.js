import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Button from '@material-ui/core/Button';
import './ProductDetail.css';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 250,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

const ProductDetail = ({ product, setProduct, handleProductClick }) => {
    const classes = useStyles();


    const handleInputChange = name => (event) => {
        setProduct({ ...product, [name]: event.target.value });
    };

    const handleOnClick = () => {
        handleProductClick(product);
    };

    return (
        <div className="detailWrapper">
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Nombre"
                    className={classes.textField}
                    value={product.name}
                    onChange={handleInputChange('name')}
                    margin="normal"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Precio"
                    className={classes.textField}
                    value={product.price}
                    onChange={handleInputChange('price')}
                    margin="normal"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField
                    id="standard-name"
                    label="Rendimieno"
                    className={classes.textField}
                    value={product.amountLimit}
                    onChange={handleInputChange('amountLimit')}
                    margin="normal"
                />
            </FormControl>
            <Button variant="contained" className={classes.button} onClick={handleOnClick}>
                Agregar
            </Button>
        </div>
    );
};

export default ProductDetail;
