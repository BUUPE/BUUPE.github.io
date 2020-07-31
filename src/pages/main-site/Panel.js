import React, { Component } from "react";

import Footer from "../../components/main-site/Footer";
import Header2 from "../../components/main-site/Header2";
import Header3 from "../../components/main-site/Header3";
import Spacer from "../../components/main-site/Spacer";
import NotEboard from "../../components/main-site/NotEboard";

import "../../styles/main-site/main.css";
import { withAuthorization, AuthUserContext } from "../../api/Session";

import { compose } from "recompose";

import PanelInfo from "../../components/main-site/PanelInfo.js";

class PanelBase extends Component {
  constructor(props) {
	super(props);
	
	this.state = {
	  isMember: false,
	  isEboard: false
	};
  }
  
  getUser = (authUser) => {
    this.props.firebase.getUID(authUser.uid).then((doc) => {
      this.setState({ isMember: (doc.data().roles && !!doc.data().roles.upemember), isEboard: (doc.data().roles && !!doc.data().roles.eboard) });
    });
  };
	
  render() {
    return (
      <div className="landing">
        <AuthUserContext.Consumer>
          {(authUser) =>
            authUser ? (
              <div>
                {this.getUser(authUser)}
                {this.state.isEboard ? <Header3 /> : <Header2 />}
                {this.state.isMember ? <PanelInfo /> : <NotEboard />}
              </div>
            ) : (
              <Spacer />
            )
          }
        </AuthUserContext.Consumer>
        <Footer />
      </div>
    );
  }
};

const condition = (authUser) => authUser != null;

const Panel = compose(withAuthorization(condition))(PanelBase);

export default Panel;
