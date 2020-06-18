import Container from "react-bootstrap/Container";
import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../../styles/main-site/main.css";

import logo from "../../assets/img/logo.png";

import ResetPassword from '../../components/main-site/ResetPassword';
import VerifyEmail from '../../components/main-site/VerifyEmail';

const INITIAL_STATE = {
  actionCode: '',
  continueUrl: '',
  password: false,
  vEmail: false,
  erroring: false,
  errorMsg: "",
};

class Action extends Component {
  constructor(props) {
	super(props);
	
	this.state = { ...INITIAL_STATE}
  }
  
  componentDidMount = () => {
	var mode = this.getParameterByName('mode');
	var actionCode = this.getParameterByName('oobCode');
	var continueUrl = this.getParameterByName('continueUrl');
	
	this.setState({actionCode, continueUrl})
	
	switch(mode){
	  case 'resetPassword':
	    this.resetPasswordLoad();
		break;
      case 'verifyEmail':
	    this.verifyEmailLoad();
		break;
	  default:
	    this.throwError("Mode Not Found");
		break;
	}
  }
  
  getParameterByName = p => {
	const queryString = this.props.location.search;
	const urlParams = new URLSearchParams(queryString);
	return urlParams.get(p);
  }
  
  throwError = (err) => { this.setState({erroring: true, errorMsg: err}) }
  
  resetPasswordLoad = () => { this.setState({password: true}) }
  
  verifyEmailLoad =  () => { this.setState({vEmail: true}) }
  
  render() {
	if (this.state.erroring) {
		return (
          <Container>
            <Row className="text-center logo">
              <Col>
                <img src={logo} alt="UPE Logo" height="256" width="256" />
              </Col>
            </Row>

            <Row className="text-center title">
              <Col>
                <h1>You have ran into an error!</h1>
              </Col>
            </Row>

            <Row className="text-center bodyText">
              <Col>
                <p>
				  {this.state.errorMsg}
                </p>
              </Col>
            </Row>
          </Container>
		);
	} else if (this.state.password) {
		return ( <ResetPassword actionCode={this.state.actionCode} continueUrl={this.state.continueUrl} /> );
	} else if (this.state.vEmail) {
		return ( <VerifyEmail actionCode={this.state.actionCode} continueUrl={this.state.continueUrl} /> );
	} else {
		return (
          <Container>
            <Row className="text-center logo">
              <Col>
                <img src={logo} alt="UPE Logo" height="256" width="256" />
              </Col>
            </Row>

            <Row className="text-center title">
              <Col>
                <h1>Loading...</h1>
              </Col>
            </Row>

            <Row className="text-center bodyText">
              <Col>
                <p>
				  If you find yourself stuck here for a long time, please click <a href="/">here</a> to go back.
                </p>
              </Col>
            </Row>
          </Container>
		);
	} 
  }
}

export default Action;