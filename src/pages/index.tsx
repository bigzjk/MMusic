import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Route, Switch, HashRouter } from "react-router-dom";

import store from '../redux/store'

import Home from "./home";
import Search from "./search";
import Detail from "./detail";
import './common.scss'
const routes = () => (
  <div className="primary-layout">
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/detail" component={Detail} />
      </Switch>
    </main>
  </div>
)

ReactDOM.render(
  <div>
    <Provider store={store}>
        <HashRouter>
          {routes()}
        </HashRouter>
      </Provider>
  </div>, document.getElementById('root'))
