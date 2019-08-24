import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import Home from "./home";
import Search from "./search";
const PrimaryLayout = () => (
  <div className="primary-layout">
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/search" component={Search} />
      </Switch>
    </main>
  </div>
);

export default PrimaryLayout;