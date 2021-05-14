import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MemberList from "../components/MemberList";

import Container from "react-bootstrap/Container";

import "../styles/main.css";

const Members = () => {
  return (
    <div className="landing">
      <Header />
      <div style={{ padding: "20px" }}></div>
	
  	  <Container  style={{ "padding-top": "50px" }}>
        <MemberList />
	  </Container>

      <Footer />
    </div>
  );
};

export default withRouter(Members);
