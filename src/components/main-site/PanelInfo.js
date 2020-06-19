import React, { Component } from "react";

import Spacer from "./Spacer"
import UserPanel from "./UserPanel"
import Header2 from "./Header2";
import Header3 from "./Header3";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';
import {AuthUserContext, withAuthentication} from '../../api/Session';
import { withStyles } from "@material-ui/styles";

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  card: {
    width: "50%%",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
	borderRadius: "15px",
	backgroundColor: "#f2cb6c",
	paddingTop: "15px",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
	"& p": {
	  fontSize: "20px",
	  color: "#333",
	  fontWeight: "600",
	},
	"& a": {
	  color: "#f21131",
	  textDecoration: "none",
	  "&:hover": {
		color: "#C30000",
	  },
	},
  },
};

class PanelInfoBase extends Component {
  constructor(props){
	super(props);
	
	this.state = {
	  sentVerification: false,
	  isEboard: false,
	  dbUser: null,
	  doc: null,
	  error: null,
	}
  }
  
  componentDidMount = () => {
  }
  
  getUser = authUser => {
	this.props.firebase.getEmail(authUser.email).then(querySnapshot => {
      const user = querySnapshot.docs.map(doc => doc.data());
	  const docs = querySnapshot.docs;
	  const eboard = user[0].eboard;
      this.setState({isEboard: eboard, dbUser: user[0], doc: docs[0]});
    })
  }
  
  sendVerification = () => {
	var callable = this.props.firebase.callFun('resetPassword');
	  
	callable({email: this.state.dbUser.email}).then(() => {
		this.setState({sentVerification: true});
	}).catch(error => {
		this.setState({error});
	})
  }

  render() {
	const { classes } = this.props;
	  
	return (
	  <AuthUserContext.Consumer>
        {authUser => authUser ? 
		  (
		    <div>
			  {this.getUser(authUser)}
			  {this.state.isEboard ? <Header3 /> : <Header2 />}
			  {authUser.emailVerified ? 
			    <> </> 
			  : 
			    <>
			    {this.state.sentVerification ?
				  <Container>
				    <Row>
				      <Col className={classes.card}>
					    <p> Verification email sent!.</p>
					  </Col>
				    </Row>
				  </Container>
				:
				  <Container>
				    <Row>
				      <Col className={classes.card}>
					    <p> You haven't yet confirmed your email! This can result in restrictions to the use of your account on the website. To confirm your email click <a href="#" onClick={this.sendVerification}>here</a>.</p>
						{this.state.error ? 
		                  <p>{this.state.error.message}</p>
		                :
                          <></>
		                }
					  </Col>
				    </Row>
				  </Container>
				}
				</>
			  }
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
  withStyles(styles),
)(PanelInfoBase)

export default PanelInfo;