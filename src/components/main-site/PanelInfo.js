import React, { Component } from "react";

import Spacer from "./Spacer";
import UserPanel from "./UserPanel";


import { withFirebase } from "../../api/Firebase";
import { compose } from "recompose";
import { AuthUserContext, withAuthentication } from "../../api/Session";

import "bootstrap/dist/css/bootstrap.min.css";

class PanelInfoBase extends Component {
  static contextType = AuthUserContext;

  componentDidMount = () => {};

  render() {
	return (
	  <>
	  { this.context ? (
		<UserPanel value={this.context} />
	  ) : (
		<Spacer />
	  )};
	  </>
    );
  }
}

const PanelInfo = compose(
  withFirebase,
  withAuthentication,
)(PanelInfoBase);

export default PanelInfo;
