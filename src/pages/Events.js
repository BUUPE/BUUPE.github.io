import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import EventsCalendar from "../components/EventsCalendar";

import Container from "react-bootstrap/Container";

import "../styles/main.css";

const Members = () => {
  return (
    <div className="landing">
      <Header />
	  <Container  style={{ "padding-top": "50px" }}>
        <EventsCalendar />
	  </Container>

      <Footer />
    </div>
  );
};

export default withRouter(Members);
