import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProductsTable from './ProductsTable';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .9)',
        color: 'white',
    },
}));

const ModalTemplate = ({
    open, onAccept, onCancel, template,
}) => {
    const classes = useStyles();

    const handleAccept = () => {
        onAccept();
    };

    const handleCancel = () => {
        onCancel();
    };

    if (!template) return null;

    const { name, products } = template;

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCancel}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                maxWidth="md"
            >
                <DialogTitle className={classes.root} id="alert-dialog-slide-title">{`${name} - Lista de productos`}</DialogTitle>
                <DialogContent className={classes.root}>
                    <ProductsTable items={products} />
                </DialogContent>
                <DialogActions className={classes.root}>
                    <Button variant="contained" onClick={handleCancel}>
                        Cancelar
                    </Button>
                    <Button variant="contained" onClick={handleAccept}>
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default ModalTemplate;
