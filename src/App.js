import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import * as ROUTES from "./constants/routes";

import MainLanding from "./pages/main-site/Landing";
import About from "./pages/main-site/About";
import Contact from "./pages/main-site/Contact";
import Members from "./pages/main-site/Members";
import Events from "./pages/main-site/Events";
import NotFound from "./pages/main-site/404";
import Login from "./pages/main-site/Login";

function App() {
  return (
    <Router className="App">
      <Switch>
        <Route exact path={ROUTES.LANDING} component={MainLanding} />
        <Route exact path={ROUTES.ABOUT} component={About} />
        <Route exact path={ROUTES.CONTACT} component={Contact} />
        <Route exact path={ROUTES.MEMBERS} component={Members} />
        <Route exact path={ROUTES.EVENTS} component={Events} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
