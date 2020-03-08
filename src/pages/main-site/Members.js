import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from '../../components/main-site/Header';
import Footer from '../../components/main-site/Footer';
import MemberList from '../../components/main-site/MemberList';

import '../../styles/main-site/main.css';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

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
