import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import * as ROUTES from "../../constants/routes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import logo from "../../assets/img/logo.png";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';

const styles = {
  loginCard: {
    width: "400px",
    border: 0,
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  loginWrapper: {
    paddingTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  inputWrapper: {
    padding: "0px 10px 50px 10px",
    "& h1": {
      fontSize: "30px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
      color: "#f21131",
    },
  },
  loginCardTitle: {
    "& h1": {
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
  },
  buttonGroup: {
    paddingBottom: "10px",
    "& .btn": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
      fontFamily: "Gruppo",
      fontWeight: "800",
      fontSize: "20px",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#6C0000",
        borderColor: "#6C0000",
        fontFamily: "Gruppo",
        fontWeight: "800",
        fontSize: "20px",
        textTransform: "uppercase",
      },
	  "& a": {
		color: "#fff",
		textDecoration: "none",
	  },
    },
  },
  back: {
	paddingTop: "10px",
	paddingBottom: "15px",
	"& a": {
	  color: "#C30000",
	  textDecoration: "none",
	  fontSize: "20px",
	  fontWeight: "600",
	  "&:hover": {
		color: "#6C0000",
	  },
	},
  },
};

const INITIAL_STATE = {
  success: false,
  error: null,
};

class VerifyEmailBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  
  componentDidMount = () => {
	this.props.firebase.applyActionCode(this.props.actionCode).then(resp => {
		this.setState({success: true});
	}).catch(error => {
		this.setState({error});
	})
  }

  render() {
    const { classes } = this.props;
	const { error, success } = this.state;
	
	var hasUrl = (this.props.continueUrl === '');
	
	if (success){
		return (
          <Container className={classes.loginWrapper}>
            <div className={classes.loginCard}>
              <div className="logo">
                <img src={logo} alt="UPE Logo" height="256" width="256" />
              </div>
              <div className={classes.loginCardTitle}>
                <h1>Email Verified!</h1>
              </div>

              <div className={classes.buttonGroup}>
			    <Row>
			      <Col>
                    <Button href={hasUrl ? this.props.continueUrl : ROUTES.LOGIN}className="btn">
                      Continue
                    </Button>
			      </Col>
			    </Row>
              </div>
            </div>
          </Container>
		);
	} else {
		return (
          <Container className={classes.loginWrapper}>
            <div className={classes.loginCard}>
              <div className="logo">
                <img src={logo} alt="UPE Logo" height="256" width="256" />
              </div>
              <div className={classes.loginCardTitle}>
                {error ? 
		          <h1>{error.message}</h1>
		        :
                  <h1>Loading...</h1>
		        }
              </div>
            </div>
          </Container>
		);
	}
  }
}


const VerifyEmail = compose(
  withFirebase,
  withStyles(styles),
)(VerifyEmailBase)

export default VerifyEmail;
