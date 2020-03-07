import React from 'react';
import { withRouter } from 'react-router-dom';

import '../../styles/main-site/main.css';

import Header from '../../components/main-site/Header';
import Footer from '../../components/main-site/Footer';
import ContactForm from '../../components/main-site/ContactForm';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

const About = () => {
  
  return (
    <div className="landing">
	  <Header />

      <Container>
	  
		<Row>
		  <Col md={12}>
			<div className="title">
				<h1>Contact Us</h1>
			</div>
		  </Col>
		</Row>
		
	  </Container>
	  
	  <Container>
	    <ContactForm />
	  </Container>
	  
	  <Footer />
    </div>
  );
}

export default withRouter(About);
