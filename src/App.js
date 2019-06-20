import React, { Component } from 'react';
import './App.css';
import { observer } from 'mobx-react';
import { Route, Switch } from 'react-router';
import Error404 from './components/Error404';
import Login from './components/Login';
import Auth from './services/Auth';
import PropsRoute from './utils/PropsRoute';
import ConfigStore from './stores/ConfigStore';
import { STATE_ERROR, STATE_PENDING } from './config';
import Loading from './components/Loading';
import Error from './components/Error';
import Auth0 from './components/Auth0';
import Home from './views/Home';
import PrivateRoute from './utils/PrivateRoute';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventsStore from './stores/EventsStore';
import AppContext from './utils/context';
import NewEvent from './views/NewEvent';
import UsersStore from './stores/UsersStore';
import ProductsStore from './stores/ProductsStore';
import DipEvent from "./views/DipEvent";
import Assist from "./views/Assists";

const context = {
    rootStore: {},
};

@observer
class App extends Component {
    constructor(props) {
        super(props);
        this.Auth = new Auth();
        context.rootStore = {
            Auth: this.Auth,
            configStore: new ConfigStore(),
            eventStore: new EventsStore(this.Auth),
            userStore: new UsersStore(this.Auth),
            productStore: new ProductsStore(this.Auth),
        };
        context.rootStore.configStore.fetchConfig();
    }

    render() {
        const { urls, state } = context.rootStore.configStore;
        if (state === STATE_PENDING) return <Loading />;
        if (state === STATE_ERROR) return <Error />;
        return (
            <AppContext.Provider value={context}>
                <Switch>
                    <PropsRoute exact path={urls.login} component={Login} />
                    <PropsRoute exact path={urls.auth} component={Auth0} />
                    <PropsRoute exact path={urls.confirm} component={Assist} />
                    <PrivateRoute exact path={urls.newEvent} component={NewEvent} />
                    <PrivateRoute exact path={urls.root} component={Login} />
                    <PrivateRoute exact path={urls.home} component={Home} />
                    <PrivateRoute exact path={urls.dipEvent} component={DipEvent} />
                    <Route component={Error404} />
                </Switch>
            </AppContext.Provider>
        );
    }
}

export default App;
