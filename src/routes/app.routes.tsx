import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateService from "../pages/CreateService";
import HomeClient from "../pages/HomeClient";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeClient} />
        <Route path="/criarservico" component={CreateService} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRoutes;
