import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import projectsIMG from "../../assets/img/projects.jpg";

import * as ROUTES from "../../constants/routes";
import "../../styles/main-site/main.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const MainLanding = () => {
  return (
    <div className="landing">
      <Header />

      <Container>
        <Row>
          <Col md={12}>
            <div className="title">
              <h1>About Us</h1>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={2} />

          <Col md={8}>
            <div className="bodyText text-center">
              <p>
                Upsilon Pi Epsilon (UPE) at BU is an honor society dedicated to
                promoting excellence in technical and computing disciplines.
                UPE's chapter at BU has as it's main focus the improvement of
                it's member's technical skills, as to complement the school's
                great theoretical teaching.
              </p>
            </div>

            <div className="buttonBlock text-center">
              <Button className="btn btn-about">
                <Link className="white-text" to={ROUTES.ABOUT}>About Us</Link>
              </Button>
            </div>
          </Col>

          <Col md={2} />
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={12}>
            <div className="title">
              <h1>Our Projects</h1>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={1} />

          <Col md={4}>
            <img src={projectsIMG} alt="UPE Projects" width="400" />
          </Col>

          <Col md={5}>
            <div className="bodyText text-center">
              <p>
                Both UPE as an organization, and each of our dedicated members
                are constantly working on amazing projects both related to the
                org. or otherwise!
              </p>
            </div>

            <div className="buttonBlock text-center">
              <Button
                className="btn btn-about"
                href="https://github.com/BUUPE/"
              >
                Learn More
              </Button>
            </div>
          </Col>

          <Col md={2} />
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default withRouter(MainLanding);
