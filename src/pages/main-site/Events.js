import React from "react";
import { withRouter } from "react-router-dom";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import EventsCalendar from "../../components/main-site/EventsCalendar";

import "../../styles/main-site/main.css";

const Members = () => {
  return (
    <div className="landing">
      <Header />

      <EventsCalendar />

      <Footer />
    </div>
  );
};

export default withRouter(Members);
