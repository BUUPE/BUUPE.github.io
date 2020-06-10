import React from "react";
import { BrowserRouter as Router } from "react-router-dom";


import { withFirebase } from './api/Firebase';
import { compose } from 'recompose';

import Navigation from "./components/main-site/Navigation";

import { withAuthentication } from './api/Session';
 
const AppBase = () => (
  <Router>
    <div>
      <Navigation />
    </div>
  </Router>
);

const App = compose(
  withFirebase,
  withAuthentication,
)(AppBase);

export default App;
