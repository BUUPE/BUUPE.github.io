import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';

const styles = {
  card: {
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
  wrapper: {
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
  title: {
	paddingTop: "15px",
    "& h1": {
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
  },
  buttonGroup: {
    paddingBottom: "15px",
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
  passwordOne: "",
  paddwordTwo: "",
  error: null,
};

class CredentialsFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
 
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
		window.location.reload(false);
      })
      .catch(error => {
        this.setState({ error });
      });
 
	event.preventDefault();
  };
 

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { passwordTwo, passwordOne, error } = this.state;
    const isInvalid = passwordTwo === "" || passwordOne === "" || passwordOne !== passwordTwo;
    return (
      <Container className={classes.wrapper}>
        <div className={classes.card}>
          <Form onSubmit={this.onSubmit}>
            <div className={classes.title}>
              <h1>Login Data</h1>
            </div>
			
			<div className={classes.inputWrapper}>
              <h1>Password One</h1>
              <InputGroup>
                <Form.Control
                  name="passwordOne"
                  type="password"
                  placeholder="Password..."
                  value={passwordOne}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>
			
			<div className={classes.inputWrapper}>
              <h1>Password Two</h1>
              <InputGroup>
                <Form.Control
                  name="passwordTwo"
                  type="password"
                  placeholder="Password..."
                  value={passwordTwo}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.buttonGroup}>
			  <Row>
			    <Col>
                  <Button disabled={isInvalid} type="submit" className="btn">
                    Update Login Details
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


const CredentialsForm = compose(
  withFirebase,
  withStyles(styles),
)(CredentialsFormBase)

export default CredentialsForm;