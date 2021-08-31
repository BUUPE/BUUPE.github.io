import React, { Component } from "react";

import Spacer from "./Spacer";
import UserPanel from "./UserPanel";

import { withFirebase } from "../api/Firebase";
import { AuthUserContext } from "../api/Session";

import "bootstrap/dist/css/bootstrap.min.css";

class PanelInfoBase extends Component {
  static contextType = AuthUserContext;

  componentDidMount = () => {};

  render() {
    return (
      <>{this.context ? <UserPanel value={this.context} /> : <Spacer />};</>
    );
  }
}

const PanelInfo = withFirebase(PanelInfoBase);

export default PanelInfo;
