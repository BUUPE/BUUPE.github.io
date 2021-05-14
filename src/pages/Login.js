import React from "react";

import "../styles/main.css";
import LoginForm from "../components/LoginForm";
import { AuthUserContext } from "../api/Session";
import * as ROUTES from "../constants/routes";

class Login extends React.Component {
  static contextType = AuthUserContext;

  componentDidMount() {
    if (this.context) this.props.history.push(ROUTES.PANEL);
  }

  render() {
    if (this.context) {
      return null;
    } else {
      return <LoginForm history={this.props.history} />;
    }
  }
}

export default Login;
