import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';
import { withStyles } from "@material-ui/styles";

const styles = {
  inputWrapper: {
    padding: "0px 10px 50px 10px",
    "& h1": {
      fontSize: "30px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
      color: "#f21131",
    },
  },
  title: {
	paddingTop: "15px",
    "& h1": {
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
  },
  buttonGroup: {
    paddingBottom: "15px",
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
  fileUpload: {
	textAlign: "center",
  },
};

const INITIAL_STATE = {
  name: "",
  className: "",
  gradYear: 0,
  file: null,
  eboard: false,
  position: "",
  positionRank: -1,
  twitter: "",
  github: "",
  facebook: "",
  linkedin: "",
  changedPosition: false,
  changedEboard: false,
  error: null,
};

class DataEditBase extends Component {
  constructor(props) {
    super(props);
	
	this.state = { ...INITIAL_STATE };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  onFileChange = event => {
	var f = event.target.files[0];
	console.log(f);
	if (f.type !== "image/jpg" && f.type !== "image/png") {
	  console.log("Invalid file type")
	  f = null;
	}
  
	this.setState({file: f});
  };
  
  onPositionChange = event => {
	var p = event.target.value;
	var pR = -1;
	if (p === "President") {
	  pR = 0;
	} else if (p === "Vice President") {
	  pR = 1;
	} else if (p === "Secretary") {
	  pR = 2;
	} else if (p === "Treasurer") {
	  pR = 3;
	} else if (p === "Director of Operations") {
	  pR = 4;
	} else if (p === "Director of Recruitment") {
	  pR = 5;
	} else if (p === "Director of Internal Development") {
	  pR = 6;
	} else if (p === "Director of Marketing") {
	  pR = 7;
	} else {
	  p = "";
	}
	
	this.setState({position: p, positionRank: pR, positionChanged: true});
  };
  
  onEboardChange = event => {
	this.setState({eboard: event.target.value, changedEboard: true});
  };
  
  onSubmit = event => {
    const { name, className, gradYear, file, eboard, position, positionRank, twitter, github, facebook, linkedin, changedPosition, changedEboard } = this.state;
	
	var n = this.props.value.name;
	if (name !== "")
		n = name;
	
	var c = this.props.value.class;
	if (className !== "")
		c = className;
	
	var gY = this.props.value.gradYear;
	if (gradYear !== 0)
		gY = gradYear;
	
	var im = this.props.value.imgFile;
	if (im === "")
		im = name.split(' ')[0];
	
	var eb = this.props.value.eboard;
	if (changedEboard)
		eb = eboard;
	
	var p = this.props.value.position;
	var pR = this.props.value.positionRank
	if (changedPosition) {
		p = position;
	    pR = positionRank;
	}
	
	var face = this.props.value.facebook;
	if (facebook !== "")
		face = facebook;
	
	var tw = this.props.value.twitter;
	if (twitter !== "")
		tw = twitter;
	
	var git = this.props.value.github;
	if (github !== "")
		git = github;
	
	var lin = this.props.value.linkedin;
	if (linkedin !== "")
		lin = linkedin;
	
	const data = {
		name: n,
		class: c,
		gradYear: gY,
		imgFile: im,
		eboard: eb,
		position: p,
		positionRank: pR,
		facebook: face,
		twitter: tw,
		github: git,
		linkedin: lin,
	};
	
	if(file !== null){
	  this.props.firebase.delImage(this.props.value.class, this.props.value.imgFile);
	  var uploadTask = this.props.firebase.uploadImage(this.props.value.class, im).put(file);
	  
	  uploadTask.on('state_changed', function(snapshot){
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		console.log('Upload is ' + progress + '% done');
	  }, function(error) {
		this.setState({ error });
	  }, function() {
        console.log("Upload Successful!");
	  });
	}
	
    this.props.firebase.editData(this.props.doc.id, data).then( () => {
		window.location.reload(false);
	})
    .catch(error => {
        this.setState({ error });
    });
	
	event.preventDefault();
  };

  render() {
	const { classes } = this.props;
    const { name, className, gradYear, file, eboard, position, twitter, github, facebook, linkedin, error } = this.state;
    const isInvalid = name === "" && className === "" && gradYear === 0 && file === null && position === "" && twitter === "" && facebook === "" && github === "" && linkedin === "";
	
	
	const year = new Date().getFullYear();
    const years = [];
	for (let i = year; i <= year + 5; i++) {
      years.push(i);
    }
	
	const classList = ["Alpha", "Beta", "Gamma", "Delta", "Alumni"];
	const positionList = ["President", "Vice President", "Secretary", "Treasurer", "Director of Operations", "Director of Recruitment", "Director of Internal Development", "Director of Marketing"];
	  
    return (
	  <Form onSubmit={this.onSubmit}>
        <div className={classes.inputWrapper}>
          <h1>Name</h1>
          <InputGroup>
            <Form.Control
              name="name"
              type="text"
              placeholder="Adam Smith"
              value={name}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>
			
	  	<div className={classes.inputWrapper}>
          <h1>Class</h1>
          <InputGroup>
            <Form.Control
              name="className"
              as="select"
              value={className}
              onChange={this.onChange}
            >
		      <option value="">-</option>
              {classList.map(c => <option key={c}>{c}</option>)}
			</Form.Control>
          </InputGroup>
        </div>
			
		<div className={classes.inputWrapper}>
          <h1>Grad. Year</h1>
          <InputGroup>
            <Form.Control
              name="gradYear"
              as="select"
              value={gradYear}
              onChange={this.onChange}
            >
		      <option value="">-</option>
			  {years.map(year => <option key={year}>{year}</option>)}
			</Form.Control>
          </InputGroup>
        </div>
			
		<div className={classes.inputWrapper}>
          <h1>Eboard</h1>
          <InputGroup>
            <Form.Control
              name="eboard"
              type="boolean"
              value={eboard}
              onChange={this.onEboardChange}
            />
          </InputGroup>
        </div>
			
		<div className={classes.inputWrapper}>
          <h1>Position</h1>
          <InputGroup>
            <Form.Control
              name="position"
              as="select"
              value={position}
              onChange={this.onPositionChange}
            >
		      <option value="">-</option>
              {positionList.map(p => <option key={p}>{p}</option>)}
		    </Form.Control>
          </InputGroup>
        </div>
			
	    <div className={classes.inputWrapper}>
          <h1>Profile Image</h1>
          <input type="file" name="file" className={classes.fileUpload} onChange={this.onFileChange} accept=".jpg,.png"/>
        </div>
			
	    <div className={classes.inputWrapper}>
          <h1>Twitter</h1>
          <InputGroup>
            <Form.Control
              name="twitter"
              type="url"
              placeholder="http://twitter.com/"
              value={twitter}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>
			
		<div className={classes.inputWrapper}>
          <h1>Github</h1>
          <InputGroup>
            <Form.Control
              name="github"
              type="url"
              placeholder="http://github.com/"
              value={github}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>
			
	    <div className={classes.inputWrapper}>
          <h1>Facebook</h1>
          <InputGroup>
            <Form.Control
              name="facebook"
              type="url"
              placeholder="https://www.facebook.com/"
              value={facebook}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>
			
		<div className={classes.inputWrapper}>
          <h1>Linkedin</h1>
          <InputGroup>
            <Form.Control
              name="linkedin"
              type="url"
              placeholder="https://www.linkedin.com/"
              value={linkedin}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>

        <div className={classes.buttonGroup}>
		  <Row>
			<Col>
              <Button disabled={isInvalid} type="submit" className="btn">
                Update Data
              </Button>
			</Col>
		  </Row>
        </div>

        {error && <p className="error-msg">{error.message}</p>}
      </Form>
    );
  }
}

const DataEdit = compose(
  withFirebase,
  withStyles(styles),
)(DataEditBase)


export default DataEdit;