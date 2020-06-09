import Container from "react-bootstrap/Container";
import React, { Component } from "react";

import "../../styles/main-site/main.css";
import LoginForm from "../../components/main-site/LoginForm";

class Login extends Component {  
  render() {
	return (
	  <Container>
        <LoginForm history={this.props.history} />
      </Container>
	);
  }
}

export default Login;