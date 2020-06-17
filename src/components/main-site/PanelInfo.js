import React, { Component } from "react";

import Spacer from "./Spacer"
import UserPanel from "./UserPanel"
import Header2 from "./Header2";
import Header3 from "./Header3";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';
import {AuthUserContext, withAuthentication} from '../../api/Session';

import "bootstrap/dist/css/bootstrap.min.css";

class PanelInfoBase extends Component {
  constructor(props){
	super(props);
	
	this.state = {
	  isEboard: false,
	  dbUser: null,
	  doc: null,
	}
  }
  
  getUser = authUser => {
	this.props.firebase.getEmail(authUser.email).then(querySnapshot => {
      const user = querySnapshot.docs.map(doc => doc.data());
	  const docs = querySnapshot.docs;
	  const eboard = user[0].eboard;
      this.setState({isEboard: eboard, dbUser: user[0], doc: docs[0]});
    })
  }

  render() {
	return (
	  <AuthUserContext.Consumer>
        {authUser => authUser ? 
		  (
		    <div>
			  {this.getUser(authUser)}
			  {this.state.isEboard ? <Header3 /> : <Header2 />}
		      {this.state.dbUser ? (<UserPanel value={this.state.dbUser} doc={this.state.doc} />) : <Spacer />}
			</div>
		  ) 
		  : 
		  <Spacer />
		}  
      </AuthUserContext.Consumer>
	);
  }
	
}

const PanelInfo = compose(
  withFirebase,
  withAuthentication,
)(PanelInfoBase)

export default PanelInfo;