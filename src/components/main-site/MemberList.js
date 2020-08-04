import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import MemberCard from "./MemberCard.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from "../../api/Firebase";
import { compose } from "recompose";

const styles = {
  listings: {
    paddingBottom: "100px",
  },
};

class MemberListBase extends Component {
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
    this.props.firebase
      .getEboard()
      .then((querySnapshot) => {
        const eboard = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ eboard });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  getAlpha() {
    this.props.firebase
      .getClass("Alpha")
      .then((querySnapshot) => {
        const alphaClass = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ alphaClass });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  getBeta() {
    this.props.firebase
      .getClass("Beta")
      .then((querySnapshot) => {
        const betaClass = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ betaClass });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  getGamma() {
    this.props.firebase
      .getClass("Gamma")
      .then((querySnapshot) => {
        const gammaClass = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ gammaClass });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  getDelta() {
    this.props.firebase
      .getClass("Delta")
      .then((querySnapshot) => {
        const deltaClass = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ deltaClass });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  getAlumni() {
    this.props.firebase
      .getAlumn()
      .then((querySnapshot) => {
        const alumniClass = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ alumniClass });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  render() {
    const { classes } = this.props;

    const eboard = this.state.eboard.map((item, index) => (
      <MemberCard data={item} key={index} pos={true} />
    ));
    const alphaClass = this.state.alphaClass.map((item, index) => (
      <MemberCard data={item} key={index} pos={false} />
    ));
    const betaClass = this.state.betaClass.map((item, index) => (
      <MemberCard data={item} key={index} pos={false} />
    ));
    const gammaClass = this.state.gammaClass.map((item, index) => (
      <MemberCard data={item} key={index} pos={false} />
    ));
    const deltaClass = this.state.deltaClass.map((item, index) => (
      <MemberCard data={item} key={index} pos={false} />
    ));
    const alumniClass = this.state.alumniClass.map((item, index) => (
      <MemberCard data={item} key={index} pos={true} />
    ));

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
const MemberList = compose(withFirebase, withStyles(styles))(MemberListBase);

export default MemberList;
