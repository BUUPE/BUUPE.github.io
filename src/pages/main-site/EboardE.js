import React, { Component } from "react";

import Header2 from "../../components/main-site/Header2";
import Header3 from "../../components/main-site/Header3";
import Footer from "../../components/main-site/Footer";

import "../../styles/main-site/main.css";
import { withAuthorization, AuthUserContext } from "../../api/Session";

import { compose } from "recompose";
import { withFirebase } from "../../api/Firebase";

import NotEboard from "../../components/main-site/NotEboard";
import Spacer from "../../components/main-site/Spacer";
import EventsManagement from "../../components/main-site/EventsManagement";

class EboardMBase extends Component {
  static contextType = AuthUserContext;

  render() {
    return (
	<>
	  { this.context ? (
		<>
		  {this.context.roles.eboard ? <Header3 /> : <Header2 />}
          {this.context.roles.eboard ? <EventsManagement /> : <NotEboard />}
		</>
	  ) : (
		<Spacer />
	  )};
	  <Footer />
	</>
    );
  }
}

const condition = (authUser) => authUser != null;

const EboardM = compose(
  withFirebase,
  withAuthorization(condition)
)(EboardMBase);

export default EboardM;
