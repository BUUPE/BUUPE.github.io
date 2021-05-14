import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { withFirebase } from "./api/Firebase";
import { compose } from "recompose";

import * as ROUTES from "./constants/routes";

import MainLanding from "./pages/Landing";
import Panel from "./pages/Panel";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Members from "./pages/Members";
import EboardM from "./pages/EboardM";
import EboardU from "./pages/EboardU";
import EboardE from "./pages/EboardE";
import Events from "./pages/Events";
import NotFound from "./pages/404";
import Login from "./pages/Login";
import Logout from "./pages/Logout";





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
