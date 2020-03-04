import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import * as ROUTES from './constants/routes';

//Global Pages
import NotFound from './components/global/404';

//Main Website Pages
import MainLanding from './components/main-site/Landing';
import About from './components/main-site/About';
import Members from './components/main-site/Members';
import Contact from './components/main-site/Contact';
import Events from './components/main-site/Events';


function App() {
  return (
  <Router className="App">
    <Switch>
      <Route exact path={ROUTES.LANDING} component={MainLanding} />
      <Route path={ROUTES.ABOUT} component={About} />
	  <Route path={ROUTES.MEMBERS} component={Members} />
	  <Route path={ROUTES.CONTACT} component={Contact} />
	  <Route path={ROUTES.EVENTS} component={Events} />
      <Route component={NotFound} />
    </Switch>
  </Router>
  );
}

export default App;
