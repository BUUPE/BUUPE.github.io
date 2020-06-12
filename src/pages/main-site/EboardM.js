import React, { Component } from "react";

import Header2 from "../../components/main-site/Header2";
import Footer from "../../components/main-site/Footer";

import "../../styles/main-site/main.css";
import { withAuthorization } from '../../api/Session';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { compose } from 'recompose';

import PanelInfo from "../../components/main-site/PanelInfo.js"

class EboardMBase extends Component {
  render() {
	return (
      <div className="landing">
        <Header2 />

        <Container>
          <Row>
            <Col>
		      <PanelInfo />
		    </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    );
  }
};

const condition = () => "eboard";

const EboardM = compose(
  withAuthorization(condition),
)(EboardMBase)

export default EboardM;
