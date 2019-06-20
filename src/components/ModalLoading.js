import React from 'react';
import Slide from '@material-ui/core/Slide';
import makeStyles from '@material-ui/core/styles/makeStyles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react-lite';
import { STATE_DONE, STATE_ERROR, STATE_PENDING } from '../config';

const Transition = React.forwardRef((props, ref) => <Slide direction="down" ref={ref} {...props} />);

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .9)',
        color: 'white',
    },
}));

const ModalLoading = observer(({
    state, setOpen, open,
}) => {
    const classes = useStyles();

    const handleAccept = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    let contentNode;
    switch (state) {
        case STATE_DONE:
            contentNode = <div>Done</div>;
            break;
        case STATE_PENDING:
            contentNode = <div>Working...</div>;
            break;
        case STATE_ERROR:
            contentNode = <div>Error</div>;
            break;
        default:
    }

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
                <DialogTitle className={classes.root} id="alert-dialog-slide-title">Creando evento</DialogTitle>
                <DialogContent className={classes.root}>
                    {contentNode}
                </DialogContent>
                <DialogActions className={classes.root}>
                    <Button variant="contained" onClick={handleAccept}>
                            Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
});

export default ModalLoading;
