import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import CreateService from "./pages/CreateService";
import HomeClient from "./pages/HomeClient";
import Login from "./pages/Login";
import Register from "./pages/Register";

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeClient} />
        <Route path="/entrar" component={Login} />
        <Route path="/cadastrar" component={Register} />
        <Route path="/criarservico" component={CreateService} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
