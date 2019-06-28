import Button from '@material-ui/core/Button';
import React from 'react';

const ConfirmNode = ({
    guest, event, classes, setOpen, eventStore,
}) => {
    const handleConfirmClick = () => {
        setOpen(true);
        eventStore.postGuestConfirm(guest.id);
    };

    return (
        <div className="assistInfo">
            <span className="deadline">{event.deadline.toLocaleDateString()}</span>
            {guest.confirmedAssistance
                ? <span>Confirmed</span>
                : (
                    <Button variant="contained" className={classes.button} onClick={handleConfirmClick}>Confirmar
                        asistencia
                    </Button>
                )}
        </div>
    );
};

export default ConfirmNode;
