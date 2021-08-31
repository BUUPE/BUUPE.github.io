import React, { Component } from "react";
import Form from "react-bootstrap/Form";

import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";

import logo from "../assets/img/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

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
  loginCardTitle: {
    "& h1": {
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
  },
};

class LoginFormBase extends Component {
  componentDidMount = () => {
    console.log("login form mounted");
    if (this.props.firebase) {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        const pathname = window.localStorage.getItem("pathname");
        window.localStorage.removeItem("pathname");
        this.props.firebase
          .doSignInWithToken(token)
          .then(() => this.props.history.push(pathname ? pathname : "/panel"))
          .catch(console.error);
      } else {
        window.location.href = "https://upe-authenticator.herokuapp.com/";
      }
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.loginWrapper}>
        <div className={classes.loginCard}>
          <Form onSubmit={this.resetPassword}>
            <div className="logo">
              <img src={logo} alt="UPE Logo" height="256" width="256" />
            </div>
            <div className={classes.loginCardTitle}>
              <h1>Authenticating...</h1>
            </div>
          </Form>
        </div>
      </Container>
    );
  }
}

const LoginForm = compose(withFirebase, withStyles(styles))(LoginFormBase);

export default LoginForm;
