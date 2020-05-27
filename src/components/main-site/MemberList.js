import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import MemberCard from "./MemberCard.js"

import firebase from "../../api/firebase.js";

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  listings: {
    paddingBottom: "100px",
  },
};

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eboard: [],
      alphaClass: [],
      betaClass: [],
      gammaClass: [],
      deltaClass: [],
      alumniClass: [],
    };
  }

  componentDidMount() {
    this.getEboard();
    this.getAlpha();
    this.getBeta();
    this.getGamma();
    this.getDelta();
    this.getAlumni();
  }

  getEboard() {
    firebase.firestore().collection("users").where("eboard", "==", true).orderBy("name").get()
    .then(querySnapshot => {
      const eboard = querySnapshot.docs.map(doc => doc.data());
      this.setState({eboard});
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }
  
  getAlpha() {
    firebase.firestore().collection("users").where("class", "==", "Alpha").orderBy("name").get()
    .then(querySnapshot => {
      const alphaClass = querySnapshot.docs.map(doc => doc.data());
      this.setState({alphaClass});
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }
  
  getBeta() {
    firebase.firestore().collection("users").where("class", "==", "Beta").orderBy("name").get()
    .then(querySnapshot => {
      const betaClass = querySnapshot.docs.map(doc => doc.data());
      this.setState({betaClass});
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }
  
  getGamma() {
    firebase.firestore().collection("users").where("class", "==", "Gamma").orderBy("name").get()
    .then(querySnapshot => {
      const gammaClass = querySnapshot.docs.map(doc => doc.data());
      this.setState({gammaClass});
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }
  
  getDelta() {
    firebase.firestore().collection("users").where("class", "==", "Delta").orderBy("name").get()
    .then(querySnapshot => {
      const deltaClass = querySnapshot.docs.map(doc => doc.data());
      this.setState({deltaClass});
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }
  
  getAlumni() {
    firebase.firestore().collection("users").where("class", "==", "Alumni").orderBy("name").get()
    .then(querySnapshot => {
      const alumniClass = querySnapshot.docs.map(doc => doc.data());
      this.setState({alumniClass});
    })
    .catch(error => {
        console.error("Error getting documents: ", error);
    });
  }

  render() {
    const { classes } = this.props;
	
    const eboard = this.state.eboard.map((item, index) => <MemberCard data={item} key={index} pos={true} />)
	const alphaClass = this.state.alphaClass.map((item, index) => <MemberCard data={item} key={index} pos={false} />)
	const betaClass = this.state.betaClass.map((item, index) => <MemberCard data={item} key={index} pos={false} />)
	const gammaClass = this.state.gammaClass.map((item, index) => <MemberCard data={item} key={index} pos={false} />)
	const deltaClass = this.state.deltaClass.map((item, index) => <MemberCard data={item} key={index} pos={false} />)
	const alumniClass = this.state.alumniClass.map((item, index) => <MemberCard data={item} key={index} pos={true} />)

    return (
      <div>
        <Container>
          <Row>
            <Col className="title text-center">
              <h1>Officers</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{eboard}</Row>
          <Row>
            <Col className="title text-center">
              <h1>Alpha Class</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{alphaClass}</Row>
          <Row>
            <Col className="title text-center">
              <h1>Beta Class</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{betaClass}</Row>
          <Row>
            <Col className="title text-center">
              <h1>Gamma Class</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{gammaClass}</Row>
          <Row>
            <Col className="title text-center">
              <h1>Delta Class</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{deltaClass}</Row>
          <Row>
            <Col className="title text-center">
              <h1>Alumni</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{alumniClass}</Row>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(MemberList);
