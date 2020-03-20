import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Container from 'react-bootstrap/Container'

import logo from '../../assets/img/logo.png';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main-site/login.css';

const axios = require('axios')
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
	var payload={
	  "email":this.state.email,
      "password":this.state.password
    }
    event.preventDefault();
    axios.post('/api/login', payload).then((res) => {
      if (res.status === 200) {
		  console.log("success");
	  } else if (res.status === 204) {
		  console.log("match not found");
	  } else {
		  console.log("failed");
	  }
    }).catch(function (error) {
	  console.log(error);
	});
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
	  <Container className="login-wrapper">
      <div className="loginCard">
        <Form onSubmit={this.onSubmit}>
		  
		  <div className="logo">
		    <img src={logo} alt="UPE Logo" height="256" width="256" />
		  </div>
		  <div className="title">
            <h1>Sign In</h1>
		  </div>
		  
		  <div className="inputWrapper">
			<h1>Email</h1>
			<InputGroup>
			  <Form.Control 
                name="email"
				type="email" 
				placeholder="upe@bu.edu" 
				value={email}
				onChange={this.onChange}
			  />
			</InputGroup>
		  </div>
		  
		  <div className="inputWrapper">
			<h1>Password</h1>
			<InputGroup>
              <Form.Control 
                name="password"
				type="password" 
				placeholder="Password" 
				value={password}
				onChange={this.onChange}
			  />
			</InputGroup>
		  </div>

		  <div className="button-group">
            <Button disabled={isInvalid} type="submit" className="btn">
              Sign In
            </Button>
		  </div>

          {error && <p className="error-msg">{error.message}</p>}
		  
        </Form>
      </div>
	  </Container>
    );
  }
}

export default LoginForm;