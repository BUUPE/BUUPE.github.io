import React, { Component } from "react";

import Header2 from "../../components/main-site/Header2";
import Header3 from "../../components/main-site/Header3";
import Footer from "../../components/main-site/Footer";

import "../../styles/main-site/main.css";
import { withAuthorization, AuthUserContext } from '../../api/Session';

import { compose } from 'recompose';
import { withFirebase } from '../../api/Firebase';

import NotEboard from "../../components/main-site/NotEboard"
import Spacer from "../../components/main-site/Spacer"
import MemberManagement from "../../components/main-site/MemberManagement"

class EboardMBase extends Component {
  constructor(props) {
	super(props);
	
	this.state = {
	  isEboard: false,
	}
  }
	
  getUser = authUser => {
	this.props.firebase.getEmail(authUser.email).then(querySnapshot => {
      const users = querySnapshot.docs.map(doc => doc.data());
	  const user = users[0];
      this.setState({isEboard: user.eboard});
    })
  }
	
  render() {
	return (
      <div className="landing">
		<AuthUserContext.Consumer>
          {authUser => authUser ? 
		    (
			  <div>
			    {this.getUser(authUser)}
				{this.state.isEboard ? <Header3 /> : <Header2 />}
				{this.state.isEboard ? <MemberManagement /> : <NotEboard />}
		      </div>
			) 
	        :
	        <Spacer />
		  }  
        </AuthUserContext.Consumer>
        <Footer />
      </div>
    );
  }
};

const condition = authUser => authUser != null;

const EboardM = compose(
  withFirebase,
  withAuthorization(condition),
)(EboardMBase)

export default EboardM;
