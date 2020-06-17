import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import * as ROUTES from "../../constants/routes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import logo from "../../assets/img/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';

const styles = {
  loginCard: {
    width: "400px",
    border: 0,
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  loginWrapper: {
    paddingTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  inputWrapper: {
    padding: "0px 10px 50px 10px",
    "& h1": {
      fontSize: "30px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
      color: "#f21131",
    },
  },
  loginCardTitle: {
    "& h1": {
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
    "& h2": {
      fontSize: "35px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
  },
  buttonGroup: {
    paddingBottom: "10px",
    "& .btn": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
      fontFamily: "Gruppo",
      fontWeight: "800",
      fontSize: "20px",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#6C0000",
        borderColor: "#6C0000",
        fontFamily: "Gruppo",
        fontWeight: "800",
        fontSize: "20px",
        textTransform: "uppercase",
      },
	  "& a": {
		color: "#fff",
		textDecoration: "none",
	  },
    },
  },
};

const INITIAL_STATE = {
  actionCode: '',
  continueUrl: '',
  passwordOne: '',
  passwordTwo: '',
  email: '',
  error: null,
  loaded: false,
  successful: false,
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  
  componentDidMount = () => {
	this.setState({actionCode: this.props.actionCode, continueUrl: this.props.continueUrl});

	this.props.firebase.passwordReset(this.state.actionCode).then(email => {
		this.setState({email: email, loaded: true});
	}).catch(error => {
		this.setState({error});
	})
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
	
	this.props.firebase.confPasswordReset(this.state.actionCode, passwordOne).then(resp => {
		this.setState({successful: true});
	}).catch(error => {
		this.setState({error: error, loaded: false});
	})
 
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { passwordOne, passwordTwo, error, loaded, successful, continueUrl } = this.state;
    const isInvalid = passwordTwo === "" || passwordOne === "" || passwordOne !== passwordTwo;
	
	if (loaded) {
	  if (successful) {
		  
		var hasUrl = (continueUrl === '');
		return (
	      <Container>
            <Row className="text-center logo">
              <Col>
                <img src={logo} alt="UPE Logo" height="256" width="256" />
              </Col>
            </Row>

		    <Row className="text-center title">
              <Col>
		        <h1>Password Reset</h1>
		      </Col>
            </Row>

			<div className={classes.buttonGroup}>
			  <Row>
 			    <Col>
                  <Button href={hasUrl ? this.state.continueUrl : ROUTES.LOGIN} className="btn">
                    Continue
                  </Button>
			    </Col>
			  </Row>
            </div>
          </Container>
		);
	  } else {
		return (
          <Container className={classes.loginWrapper}>
            <div className={classes.loginCard}>
              <Form onSubmit={this.onSubmit}>
                <div className="logo">
                  <img src={logo} alt="UPE Logo" height="256" width="256" />
                </div>
                <div className={classes.loginCardTitle}>
                  <h1>Reset Password</h1>
                </div>

                <div className={classes.inputWrapper}>
                  <h1>Password</h1>
                  <InputGroup>
                    <Form.Control
                      name="passwordOne"
                      type="password"
                      placeholder="Password"
                      value={passwordOne}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </div>
			
			    <div className={classes.inputWrapper}>
                  <h1>Confirm Password</h1>
                  <InputGroup>
                    <Form.Control
                      name="passwordTwo"
                      type="password"
                      placeholder="Password"
                      value={passwordTwo}
                      onChange={this.onChange}
                    />
                  </InputGroup>
                </div>

                <div className={classes.buttonGroup}>
			      <Row>
 			        <Col>
                      <Button disabled={isInvalid} type="submit" className="btn">
                        Sign In
                      </Button>
			        </Col>
			      </Row>
                </div>

                {error && <p className="error-msg">{error.message}</p>}
              </Form>
            </div>
          </Container>
        );  
	  }
	} else {
	  return (
	    <Container>
          <Row className="text-center logo">
            <Col>
              <img src={logo} alt="UPE Logo" height="256" width="256" />
            </Col>
          </Row>

		  <Row className="text-center title">
            <Col>
		      {error ? 
		        <h1>{error.message}</h1>
		      :
                <h1>Loading...</h1>
		      }
		    </Col>
          </Row>
        </Container>
	  );
	}
  }
}


const LoginForm = compose(
  withFirebase,
  withStyles(styles),
)(LoginFormBase)

export default LoginForm;
