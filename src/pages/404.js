import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/main.css";
import logo from "../assets/img/logo.png";

const NotFound = () => (
  <Container>
    <Row className="text-center logo">
      <Col>
        <img src={logo} alt="UPE Logo" height="256" width="256" />
      </Col>
    </Row>

    <Row className="text-center title">
      <Col>
        <h1>404 Error: Page Not Found</h1>
      </Col>
    </Row>

    <Row className="text-center bodyText">
      <Col>
        <p>
          The page you are looking for doesn't exist!{" "}
          <Link to="/">Go Back</Link>.
        </p>
      </Col>
    </Row>
  </Container>
);

export default NotFound;
