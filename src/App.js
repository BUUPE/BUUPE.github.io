import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { withFirebase } from "./api/Firebase";
import { compose } from "recompose";

import * as ROUTES from "./constants/routes";

import MainLanding from "./pages/main-site/Landing";
import Panel from "./pages/main-site/Panel";
import About from "./pages/main-site/About";
import Contact from "./pages/main-site/Contact";
import Members from "./pages/main-site/Members";
import EboardM from "./pages/main-site/EboardM";
import EboardU from "./pages/main-site/EboardU";
import EboardE from "./pages/main-site/EboardE";
import Events from "./pages/main-site/Events";
import NotFound from "./pages/main-site/404";
import Login from "./pages/main-site/Login";
import Logout from "./pages/main-site/Logout";

import { withAuthentication } from "./api/Session";

const AppBase = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={MainLanding} />
        <Route exact path={ROUTES.ABOUT} component={About} />
        <Route exact path={ROUTES.CONTACT} component={Contact} />
        <Route exact path={ROUTES.MEMBERS} component={Members} />
        <Route exact path={ROUTES.EVENTS} component={Events} />
        <Route exact path={ROUTES.LOGIN} component={Login} />
        <Route exact path={ROUTES.LOGOUT} component={Logout} />
        <Route exact path={ROUTES.PANEL} component={Panel} />
        <Route exact path={ROUTES.MEMBEREDIT} component={EboardM} />
        <Route exact path={ROUTES.EVENTEDIT} component={EboardE} />
		    <Route exact path={ROUTES.USEREDIT} component={EboardU} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

const App = compose(withFirebase, withAuthentication)(AppBase);

export default App;
