import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { withStyles } from "@material-ui/styles";
import "bootstrap/dist/css/bootstrap.min.css";

import * as ROUTES from "../../constants/routes";

const styles = {
  padding: {
	paddingTop: "25px",
  },
  img: {
    width: '75%',
	borderRadius: "100px",
	border: "5px solid #f21131",
  },
  textMain: {
	paddingTop: "50px",
	fontFamily: 'Andale Mono, monospace',
	color: "#333",
	"& h1": {
	  fontSize: "35px",
	  fontWeight: 600,
	},
	"& h2": {
	  fontSize: "30px",
	  fontWeight: 600,
	},
	"& h3": {
	  fontSize: "25px",
	},
  },
  red: {
	color: '#f21131',
  },
  spacer: {
	paddingBottom: "50px",
	paddingTop: "50px",
	'& hr': {
	  borderTop: '5px solid #333',
	  borderRadius: '5px',
	  width: "75%",
	},
  },
  textSecond: {
	textAlign: "center",
	paddingBottom: "75px",
	fontFamily: 'Andale Mono, monospace',
	color: "#333",
	"& h4": {
	  fontSize: "20px",
	}
  }
};


class UserPanel extends Component {
  render(){
	const { classes } = this.props;
	
	var item = this.props.value;
	
	var eboardS = "Not EBoard";
	if (item.eboard){
	  eboardS = "On EBoard";
	}
	var pos = "Not Listed";
	if (item.position !== ""){
	  pos = item.position;
	}
	
    var git = "Not Listed";
    var tw = "Not Listed";
    var face = "Not Listed";
    var lin = "Not Listed";
    if (item.github !== "") {
      git = item.github;
    }
    if (item.twitter !== "") {
      tw = item.twitter;
    }
    if (item.facebook !== "") {
      face = item.facebook;
    }
    if (item.linkedin !== "") {
      lin = item.linkedin
    }


	return (
	<Container className={classes.padding}>
	  <Row className={classes.textMain}>
	    <Col>
		  <img
		    className={classes.img}
            src={require(`../../assets/img/profiles/${item.class}/${item.imgFile}`)}
            alt="Member"
          />
	    </Col>
		<Col>
		  <h1> <span className={classes.red}>Name</span>: {item.name} </h1>
		  <h2> <span className={classes.red}>Class</span>: {item.class} </h2>
		  <h2> <span className={classes.red}>Graduation Year</span>: {item.gradYear} </h2>
		  
		  <br />
		  
		  <h3> <span className={classes.red}>Email</span>: {item.email} </h3>
		  <h3> <span className={classes.red}>Password</span>: ***** </h3>
		</Col>
	  </Row>
	  
	  <Row className={classes.spacer}>
	    <Col>
		  <hr />
		</Col>
	  </Row>
	  
	  <Row className={classes.textSecond}>
	    <Col>
		  <h4> <span className={classes.red}>E-Board Status</span>: {eboardS} </h4>
		  <h4> <span className={classes.red}>Position</span>: {pos} </h4>
		  
		  <h4> <span className={classes.red}>Brownie Points</span>: 0 </h4>
		  <h4> <span className={classes.red}>Recruitment Points</span>: 0 </h4>
		</Col>
	    <Col>
		  <h4> <span className={classes.red}>Facebook</span>: {face} </h4>
		  <h4> <span className={classes.red}>Twitter</span>: {tw} </h4>
		  <h4> <span className={classes.red}>Github</span>: {git} </h4>
		  <h4> <span className={classes.red}>LinkedIn</span>: {lin} </h4>
		</Col>
	  </Row>
	  
	  <Row className="buttonBlock text-center">
	    <Col>
		  <Button
            className="btn btn-about"
            href={ROUTES.EDITDATA}
          >
            Edit Info
          </Button>
		</Col>
		<Col>
		  <Button
            className="btn btn-about"
            href={ROUTES.EDITLOGIN}
          >
            Edit Login
          </Button>
		</Col>
	  </Row>
	</Container>
	);
  }
}

export default withStyles(styles)(UserPanel);