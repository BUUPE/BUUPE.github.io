import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import * as ROUTES from './constants/routes';

import MainLanding from './pages/main-site/Landing';
import About from './pages/main-site/About';
import Contact from './pages/main-site/Contact';


function App() {
  return (
  <Router className="App">
    <Switch>
      <Route exact path={ROUTES.LANDING} component={MainLanding} />
	  <Route exact path={ROUTES.ABOUT} component={About} />
	  <Route exact path={ROUTES.CONTACT} component={Contact} />
    </Switch>
  </Router>
  );
}

export default App;
