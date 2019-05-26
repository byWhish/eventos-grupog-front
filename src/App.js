import React, { Component } from 'react';
import './App.css';
import {observer} from "mobx-react";
import Error404 from "./components/Error404";
import Login from "./components/Login";
import {Route, Switch} from "react-router";
import Auth from "./services/Auth";
import PropsRoute from "./utils/PropsRoute";
import ConfigStore from "./stores/ConfigStore";
import {STATE_ERROR, STATE_PENDING} from "./config";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Auth0 from "./components/Auth0";
import Home from "./views/Home";
import PrivateRoute from "./utils/PrivateRoute";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EventsStore from "./stores/EventsStore";
import AppContext from './utils/context';
import DipEvent from "./views/DipEvent";

const context = {
    rootStore: {}
};

@observer
class App extends Component {
  constructor(props){
    super(props);
    this.Auth = new Auth();
    context.rootStore = {
        Auth: this.Auth,
        configStore: new ConfigStore(),
        eventStore: new EventsStore(this.Auth)
    };
  };

  componentDidMount() {
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
                <PrivateRoute exact path={urls.dipEvent} component={DipEvent} />
                <PrivateRoute exact path={urls.root} component={Login} />
                <PrivateRoute exact path={urls.home} component={Home} />
                <Route component={Error404} />
            </Switch>
        </AppContext.Provider>
    );
  }
}

export default App;
