import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "assets/plugins/nucleo/css/nucleo.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

// import "assets/vendor/nucleo/css/nucleo.css";
// import "assets/vendor/@fortawesome/fontawesome-free/css/all.min.css";
// import "assets/scss/argon-dashboard-react.scss";

import "../src/assets/css/argon-dashboard-react.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import PasswordReset from "layouts/PasswordReset"
import PasswordResetEmail from "layouts/PasswordResetEmail"

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
      <Route path="/password" render={(props) => <PasswordReset {...props} />} />
      <Route path="/forget/email" render={(props) => <PasswordResetEmail {...props} />} />
      <Redirect from="/" to="/auth/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
