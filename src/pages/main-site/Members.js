import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import MemberList from "../../components/main-site/MemberList";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/main-site/main.css";

const Members = () => {
  return (
    <div className="landing">
      <Header />
	  
	  <Container>
	    <Row>
		  <Col className="title-centered">
            <h1>This page is currently in maintenance, please bear with us. </h1>
		  </Col>
		</Row>
      </Container>

      <Footer />
    </div>
  );
};

export default withRouter(Members);
