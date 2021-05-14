import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import EventsCalendar from "../../components/main-site/EventsCalendar";

import Container from "react-bootstrap/Container";

import "../../styles/main-site/main.css";

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
