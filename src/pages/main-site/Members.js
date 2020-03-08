import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../../components/main-site/Header';
import Footer from '../../components/main-site/Footer';
import MemberList from '../../components/main-site/MemberList';

import '../../styles/main-site/main.css';

const Members = () => {
  
  return (
    <div className="landing">
	  <Header />

      <MemberList />
	  
	  <Footer />
    </div>
  );
}

export default withRouter(Members);
