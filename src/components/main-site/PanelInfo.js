import React, { Component } from "react";

import Spacer from "./Spacer"
import UserPanel from "./UserPanel"

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';
import {AuthUserContext, withAuthentication} from '../../api/Session';

import "bootstrap/dist/css/bootstrap.min.css";

class PanelInfoBase extends Component {
  constructor(props){
	super(props);
	
	this.state = {
	  dbUser: null,
	  doc: null,
	}
  }
  
  getUser = authUser => {
	this.props.firebase.getEmail(authUser.email).then(querySnapshot => {
      const user = querySnapshot.docs.map(doc => doc.data());
	  const docs = querySnapshot.docs;
      this.setState({dbUser: user[0], doc: docs[0]});
    })
  }

  render() {
	return (
	  <div>
	    <AuthUserContext.Consumer>
          {authUser => authUser ? 
		    (
			  <div>
			    {this.getUser(authUser)}
				{this.state.dbUser ? (<UserPanel value={this.state.dbUser} doc={this.state.doc} />) : <Spacer />}
		      </div>
			) 
			: 
			<Spacer />
		  }  
        </AuthUserContext.Consumer>
	  </div>
	);
  }
	
}

const PanelInfo = compose(
  withFirebase,
  withAuthentication,
)(PanelInfoBase)

export default PanelInfo;