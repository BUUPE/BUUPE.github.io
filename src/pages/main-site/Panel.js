import React from "react";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";

import "../../styles/main-site/main.css";
import { withAuthorization } from '../../api/Session';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Panel = () => {
  return (
    <div className="landing">
      <Header />

      <Container>
        <Row>
		  <Col>
		    <h1> Welcome to the UPE Member Panel!! </h1>
		  </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

const condition = authUser => authUser != null;

export default withAuthorization(condition)(Panel);
