import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import * as ROUTES from './constants/routes';

import MainLanding from './pages/main-site/Landing';


function App() {
  return (
  <Router className="App">
    <Switch>
      <Route exact path={ROUTES.LANDING} component={MainLanding} />
    </Switch>
  </Router>
  );
}

export default App;
