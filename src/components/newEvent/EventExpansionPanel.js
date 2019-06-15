import React, { useContext, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import EventInfo from './EventInfo';
import EventGuestList from './EventGuestList';
import EventProductList from './EventProductList';
import history from '../../utils/History';
import './EventExpansionPanel.css';
import AppContext from '../../utils/context';

const EventExpansionPanels = () => {
    const value = useContext(AppContext);
    const { rootStore: { eventStore } } = value;
    const [guests, setGuests] = useState([]);
    const [products, setProducts] = useState([]);
    const [expanded, setExpanded] = React.useState('panel1');
    const [eventInfo, setEventInfo] = useState({
        type: '',
        name: '',
        heldAt: new Date(),
        deadline: new Date(),
        description: '',
    });

    const handleOnSelectGuest = (item) => {
        setGuests([...guests, item]);
    };

    const handleOnSelectProduct = (item) => {
        setProducts([...products, item]);
    };

    const handleOnSelectTemplate = (template) => {
        setProducts(template.products);
    };

    const handleChange = panel => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleBackClick = () => {
        history.goBack();
    };

    const handleSendClick = () => {
        eventStore.saveEvent({ eventInfo, guests, products });
    };

    return (
        <div>
            <div className="eventHeader">
                <img alt="" className="backButton" src="/img/back-white.png" onClick={handleBackClick} />
                <img alt="" className="sendButton" src="/img/send-white.png" onClick={handleSendClick} />
            </div>
            <ExpansionPanel square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Informacion del evento</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EventInfo values={eventInfo} setValues={setEventInfo} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <ExpansionPanelSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Invitados</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EventGuestList items={guests} setItems={setGuests} handleOnSelectGuest={handleOnSelectGuest} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <ExpansionPanelSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Productos</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <EventProductList items={products} setItems={setProducts} handleOnSelectProduct={handleOnSelectProduct} handleOnSelectTemplate={handleOnSelectTemplate} />
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </div>
    );
};

const ExpansionPanel = withStyles({
    root: {
        border: '1px solid rgba(0, 0, 0, .125)',
        boxShadow: 'none',
        color: 'white',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .9)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        backgroundColor: 'rgba(0, 0, 0, .8)',
        padding: theme.spacing(2),
    },
}))(MuiExpansionPanelDetails);

export default EventExpansionPanels;
