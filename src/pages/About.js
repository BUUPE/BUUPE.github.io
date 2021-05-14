import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const About = () => {
  return (
    <div className="landing">
      <Header />
      <Container style={{ "padding-top": "50px" }}>
        <Row>
          <Col md={12}>
            <div className="title">
              <h1>Who are we?</h1>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={1} />

          <Col md={10}>
            <div className="bodyText text-center">
              <p>
                UPE BU Members are both undergraduate & graduate students from
                Boston University who are either actively studying information
                technologies and computing disciplines or have shown exceeding
                interest and/or talent in them.
              </p>
            </div>

            <div className="buttonBlock text-center">
              <Button className="btn btn-about">
                <Link className="white-text" to={ROUTES.MEMBERS}>
                  Meet Us
                </Link>
              </Button>
            </div>
          </Col>

          <Col md={1} />
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={12}>
            <div className="title">
              <h1>Our Organization</h1>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={1} />

          <Col md={10}>
            <div className="bodyText">
              <p>
                Upsilon Pi Epsilon (UPE) at BU is an honor society dedicated to
                promoting excellence in technical and computing disciplines. UPE
                at BU will help prepare members for the industry through
                professional development, meaningful and interesting projects,
                and a supportive professional network.
              </p>

              <h2>Our Mission</h2>

              <p>
                Our main objective is to bridge the gap between theory and
                practical experience at Boston University. We will provide
                career advice on how to get useful internships and jobs, give a
                sense of community, develop a professional network, and provide
                opportunities for relevant and practical experience.
              </p>

              <h2>Core Values</h2>

              <p>
                We will adhere to the following core values to maintain an
                inclusive and innovative environment to achieve our goals.
              </p>
              <ul>
                <li>
                  <strong>Make Computer Science fun</strong> by fostering a
                  cooperative and productive environment.
                </li>
                <li>
                  <strong>Innovate Across Technical Sectors</strong> while
                  utilizing and contributing to new disruptive technologies. We
                  will mentor one another and create impactful and relevant
                  projects.
                </li>
                <li>
                  <strong>Ensure Diversity of Thought</strong> for successful
                  and consistent innovation by modeling real work environments
                  with many different kinds of people.
                </li>
                <li>
                  <strong>Utilize and Provide New Resources</strong> by
                  cooperating with existing organizations on campus and
                  contributing free and highly relevant public events and
                  forming mutually beneficial relationships with companies.
                </li>
                <li>
                  <strong>Transparency</strong> in how we evaluate applicants to
                  create an aura of trust and inclusivity while learning from
                  any mistakes we make.
                </li>
              </ul>
            </div>
          </Col>

          <Col md={1} />
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default withRouter(About);
