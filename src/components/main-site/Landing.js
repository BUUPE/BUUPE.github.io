import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from './Header';

const MainLanding = () => {
  
  return (
    <div className="landing">
	  <Header />

      <h1> Test </h1>
    </div>
  );
}

export default withRouter(MainLanding);
