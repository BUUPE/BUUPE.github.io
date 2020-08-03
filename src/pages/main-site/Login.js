import Container from "react-bootstrap/Container";
import React, { Component } from "react";

import "../../styles/main-site/main.css";
import LoginForm from "../../components/main-site/LoginForm";
import { compose } from "recompose";
import { AuthUserContext, withAuthentication } from "../../api/Session";
import * as ROUTES from "../../constants/routes";

class LoginBase extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {(authUser) =>
          authUser ? (
            <>{this.props.history.push(ROUTES.LANDING)}</>
          ) : (
            <>{this.props.history.push(ROUTES.LANDING)}</>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}
const Login = compose(withAuthentication)(LoginBase);

export default Login;
