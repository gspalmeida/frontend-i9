import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeAdmin from "../pages/HomeAdmin";

const AdminRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomeAdmin} />
      </Switch>
    </BrowserRouter>
  );
};

export default AdminRoutes;
