import Container from "react-bootstrap/Container";
import React, { Component } from "react";

import * as ROUTES from "../constants/routes";

import "../styles/main.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";
import { withStyles } from "@material-ui/styles";

const styles = {
  main: {
    "& h1": {
      textAlign: "center",
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
      color: "#f21131",
      paddingTop: "100px",
      paddingBottom: "100px",
    },
  },
};

class LogoutBase extends Component {
  logOut = () => {
    const { history } = this.props;

    this.props.firebase.doSignOut();
    history.push(ROUTES.LANDING);
  };

  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.main}>
        <h1> Logging Out </h1>
        {this.logOut()}
      </Container>
    );
  }
}

const Logout = compose(withFirebase, withStyles(styles))(LogoutBase);

export default Logout;
