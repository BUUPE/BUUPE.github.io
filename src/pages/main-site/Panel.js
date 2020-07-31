import React, { Component } from "react";

import Footer from "../../components/main-site/Footer";
import Header2 from "../../components/main-site/Header2";
import Header3 from "../../components/main-site/Header3";
import Spacer from "../../components/main-site/Spacer";
import NotEboard from "../../components/main-site/NotEboard";

import "../../styles/main-site/main.css";
import { withAuthorization, AuthUserContext } from "../../api/Session";

import { compose } from "recompose";

import PanelInfo from "../../components/main-site/PanelInfo.js";

class PanelBase extends Component {
  state = {
	isMember: false,
	isEboard: false
  };
  
  static contextType = AuthUserContext;

  render() {
    return (
	<>
	  { this.context ? (
		<>
		  {this.context.roles.eboard ? <Header3 /> : <Header2 />}
          {this.context.roles.upemember ? <PanelInfo /> : <NotEboard />}
		</>
	  ) : (
		<Spacer />
	  )};
	  <Footer />
	</>
    );
  }
};

const condition = (authUser) => authUser != null;

const Panel = compose(withAuthorization(condition))(PanelBase);

export default Panel;
