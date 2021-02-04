import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import HomeAdmin from "../pages/HomeAdmin";
import CreateServiceType from "../pages/CreateServiceType";

const AdminRoutes: React.FC = () => {
  return (
    <BrowserRouter >
      <Switch>
        <Route exact path="/">
          <Redirect to="/admin" />
        </Route>
        <Route exact path="/admin" component={HomeAdmin} />
        <Route exact path="/createServiceType" component={CreateServiceType} />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminRoutes;
