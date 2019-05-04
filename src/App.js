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
import Home from "./components/Home";

@observer
class App extends Component {
  constructor(props){
    super(props);
    this.Auth = new Auth();
    this.configStore = new ConfigStore();
  };

  componentDidMount() {
    this.configStore.fetchConfig();
  }

  render() {
    const { urls, state } = this.configStore;
    if (state === STATE_PENDING) return <Loading />;
    if (state === STATE_ERROR) return <Error />;
    return (
      <Switch>
          <PropsRoute exact path={urls.root} component={Login} Auth={this.Auth} />
          <PropsRoute exact path={urls.login} component={Login} Auth={this.Auth} />
          <PropsRoute exact path={urls.auth} component={Auth0} Auth={this.Auth} />
          <PropsRoute exact path={urls.home} component={Home} Auth={this.Auth} />
          <Route component={Error404} />
      </Switch>
    );
  }
}

export default App;
