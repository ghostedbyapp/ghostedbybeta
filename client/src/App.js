import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./config/PrivateRoute";

import Home from "./pages/Home.js";
import Admin from "./pages/Admin.js";
import CompanyLogs from "./pages/CompanyLogs.js";
import Privacy from "./pages/Privacy.js";
import NoMatch from "./pages/NoMatch.js";

class App extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/admin" component={Admin} />
          {/* <PrivateRoute exact path="/companyLogs" component={CompanyLogs} /> */}

          {/* Temporary route  */}
          <Route exact path="/companyLogs" component={CompanyLogs} />
          
          <Route exact path="/privacy" component={Privacy} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;
