import React from "react";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import qrImage from "../../assets/img/interest-form-qr.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const InterestFormQR = () => {
  return (
    <div className="landing">
      <Header />

      <Container>
        <Row>
          <Col md={12}>
            <div className="interestFormQr">
              <h1>Interested in joining UPE?</h1>
			  <h2> Fill the form below! </h2>
			  
			  <img src={qrImage} alt="UPE Interest Form QR Code" width="400" />
            </div>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};

export default InterestFormQR;
