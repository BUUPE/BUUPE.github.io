import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';

const styles = {
  card: {
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
  wrapper: {
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
};

const INITIAL_STATE = {
  facebook: "",
  github: "",
  twitter: "",
  linkedin: "",
  name: "",
  error: null,
};

class DataFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { facebook, github, linkedin, twitter, name} = this.state;
	
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
	
	var n = this.props.value.name;
	if (name !== "")
		n = name;
	
	const data = {
		facebook: face,
		github: git,
		linkedin: lin,
		twitter: tw,
		name: n
	};
	
    this.props.firebase.editData(this.props.doc.id, data).then( () => {
		window.location.reload(false);
	})
    .catch(error => {
        this.setState({ error });
    });
	
	event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { facebook, github, linkedin, twitter, name, error } = this.state;
    const isInvalid = name === "" && facebook === "" && github === "" && linkedin === "" && twitter === "";
    return (
      <Container className={classes.wrapper}>
        <div className={classes.card}>
          <Form onSubmit={this.onSubmit}>
            <div className={classes.title}>
              <h1>Account Data</h1>
            </div>

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
              <h1>Twitter</h1>
              <InputGroup>
                <Form.Control
                  name="twitter"
                  type="url"
                  placeholder="https://twitter.com/..."
                  value={twitter}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>
			
			<div className={classes.inputWrapper}>
              <h1>GitHub</h1>
              <InputGroup>
                <Form.Control
                  name="github"
                  type="url"
                  placeholder="http://github.com/..."
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
                  placeholder="https://www.facebook.com/..."
                  value={facebook}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>
			
			<div className={classes.inputWrapper}>
              <h1>LinkedIN</h1>
              <InputGroup>
                <Form.Control
                  name="linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/..."
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
        </div>
      </Container>
    );
  }
}


const DataForm = compose(
  withFirebase,
  withStyles(styles),
)(DataFormBase)

export default DataForm;