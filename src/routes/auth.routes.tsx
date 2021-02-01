import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";

const AuthRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/cadastrar" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default AuthRoutes;
