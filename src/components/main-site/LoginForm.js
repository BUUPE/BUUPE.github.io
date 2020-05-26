import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";

import logo from "../../assets/img/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";

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
  buttonGroupBtn: {
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
    },
  },
};

const axios = require("axios");
const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    var payload = {
      email: this.state.email,
      password: this.state.password,
    };
    event.preventDefault();
    axios
      .post("/api/login", payload)
      .then(res => {
        if (res.status === 200) {
          console.log("success");
        } else if (res.status === 204) {
          console.log("match not found");
        } else {
          console.log("failed");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
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

export default withStyles(styles)(LoginForm);
