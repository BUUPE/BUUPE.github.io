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
	  user: []
	}
  }


  getUser = email => {
	console.log(email);
  }

  render() {
	const getUser = authUser => {
	  this.props.firebase.getEmail(authUser.email).then(querySnapshot => {
        const user = querySnapshot.docs.map(doc => doc.data());
        this.setState({dbUser: user[0]});
      })
	}
	
	return (
	  <div>
	    <AuthUserContext.Consumer>
          {authUser => authUser ? 
		    (
			  <div>
			    {getUser(authUser)}
				{this.state.dbUser ? (<UserPanel value={this.state.dbUser} />) : <Spacer />}
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