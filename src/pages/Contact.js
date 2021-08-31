import React from "react";
import { withRouter } from "react-router-dom";

import "../styles/main.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <div className="landing">
      <Header />
      <Container style={{ "padding-top": "50px" }}>
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
};

export default withRouter(About);
