import * as React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter } from "react-router-dom";

import store from '../redux/store'

import Home from "./home";
import Search from "./search";
import Main from "./main";

// import 'antd-mobile/dist/antd-mobile.css';
import './common.scss'
const routes = () => (
  <div className="primary-layout">
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/main" component={Main} />
        <Route path="/home" component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
    </main>
  </div>
)

ReactDOM.render(
  <div>
    <Provider store={store}>
        <BrowserRouter>
          {routes()}
        </BrowserRouter>
      </Provider>
  </div>, document.getElementById('root')
)

