import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
		  if (condition() === "eboard" ) {
			var bool = false;
			this.props.firebase.getEmail(authUser.email).then(querySnapshot => {
				const users = querySnapshot.docs.map(doc => doc.data());
				const user = users[0];
				console.log(user.eboard);
				bool = user.eboard;
				if(!bool){
				  this.props.history.push(ROUTES.LOGIN);
			    }
			});;
		  } else if (!condition(authUser)) {
            this.props.history.push(ROUTES.LOGIN);
          }
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }
 
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};
 
export default withAuthorization;