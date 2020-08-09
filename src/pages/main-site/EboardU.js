import React, { Component } from "react";

import Header2 from "../../components/main-site/Header2";
import Header3 from "../../components/main-site/Header3";
import Footer from "../../components/main-site/Footer";

import "../../styles/main-site/main.css";
import { withAuthorization, AuthUserContext } from "../../api/Session";

import { compose } from "recompose";
import { withFirebase } from "../../api/Firebase";

import NotEboard from "../../components/main-site/NotEboard";
import Spacer from "../../components/main-site/Spacer";
import UserManagement from "../../components/main-site/UserManagement";

class EboardUBase extends Component {
  static contextType = AuthUserContext;

  render() {
    return (
      <>
        {this.context ? (
          <>
            {this.context.roles.eboard ? <Header3 /> : <Header2 />}
            {this.context.roles.eboard ? <UserManagement /> : <NotEboard />}
          </>
        ) : (
          <Spacer />
        )}
        ;
        <Footer />
      </>
    );
  }
}

const condition = (authUser) => authUser != null;

const EboardU = compose(
  withFirebase,
  withAuthorization(condition)
)(EboardUBase);

export default EboardU;
