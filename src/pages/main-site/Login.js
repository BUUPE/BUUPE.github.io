import React, { Component } from "react";

import "../../styles/main-site/main.css";
import LoginForm from "../../components/main-site/LoginForm";
import { compose } from "recompose";
import { AuthUserContext, withAuthentication } from "../../api/Session";
import * as ROUTES from "../../constants/routes";

class LoginBase extends Component {
	static contextType = AuthUserContext;
  render() {
		const authUser = this.context;
    if (authUser) {
			return (<>{this.props.history.push(ROUTES.PANEL)}</>);
		} else {
			return (<LoginForm history={this.props.history}/>);
		}
  }
}
const Login = compose(withAuthentication)(LoginBase);

export default Login;
