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
  back: {
	paddingTop: "10px",
	paddingBottom: "15px",
	"& a": {
	  color: "#C30000",
	  textDecoration: "none",
	  fontSize: "20px",
	  fontWeight: "600",
	  "&:hover": {
		color: "#6C0000",
	  },
	},
  },
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
  resetPassword: false,
  success: false,
};

class LoginFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
	
	this.handleToggleReset = this.handleToggleReset.bind(this);
  }
  
  handleToggleReset = () => {
      this.setState({
        resetPassword: !this.state.resetPassword
      });
  }

  onSubmit = event => {
    const { email, password } = this.state;
	const { history } = this.props;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
		history.push(ROUTES.PANEL);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  resetPassword = event => {
	var callable = this.props.firebase.callFun('resetPassword');
	  
	callable({email: this.state.email}).then(res => {
	  console.log(res);
	  this.setState({success: true});
	}).catch(error => {
	  this.setState({error});
	})
	
	event.preventDefault();
  }
  
  render() {
    const { classes } = this.props;
    const { email, password, error, resetPassword, success } = this.state;
    const isInvalid = password === "" || email === "";
	const isInvalid2 = email === "";
	
	if(resetPassword) {
	  if (success) {
		return (
		  <Container className={classes.loginWrapper}>
            <div className={classes.loginCard}>
              <Form onSubmit={this.resetPassword}>
                <div className="logo">
                  <img src={logo} alt="UPE Logo" height="256" width="256" />
                </div>
                <div className={classes.loginCardTitle}>
                  <h1>Email Sent!</h1>
                </div>
              </Form>
            </div>
          </Container>
	    );
	  } else {
	    return (
          <Container className={classes.loginWrapper}>
            <div className={classes.loginCard}>
              <Form onSubmit={this.resetPassword}>
                <div className="logo">
                  <img src={logo} alt="UPE Logo" height="256" width="256" />
                </div>
                <div className={classes.loginCardTitle}>
                  <h1>Reset Password</h1>
                </div>
 
                <div className={classes.inputWrapper}>
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

                <div className={classes.buttonGroup}>
			      <Row>
			        <Col>
                      <Button disabled={isInvalid2} type="submit" className="btn">
                        Reset Password
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
        <Container className={classes.loginWrapper}>
          <div className={classes.loginCard}>
            <Form onSubmit={this.onSubmit}>
              <div className="logo">
                <img src={logo} alt="UPE Logo" height="256" width="256" />
              </div>
              <div className={classes.loginCardTitle}>
                <h1>Sign In</h1>
              </div>
 
              <div className={classes.inputWrapper}>
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

              <div className={classes.inputWrapper}>
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

              <div className={classes.buttonGroup}>
			    <Row>
			      <Col>
                    <Button disabled={isInvalid} type="submit" className="btn">
                      Sign In
                    </Button>
  			      </Col>
				  <Col>
                    <Button className="btn">
                      <a href={ROUTES.LANDING}> Go Back </a>
                    </Button>
			      </Col>
  			    </Row>
              </div>
			
			  <div className={classes.buttonGroup}>
			    <Row>
			      <Col>
                    <Button onClick={this.handleToggleReset} className="btn">
                      Reset Password
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
  }
}


const LoginForm = compose(
  withFirebase,
  withStyles(styles),
)(LoginFormBase)

export default LoginForm;
