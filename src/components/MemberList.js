import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import MemberCard from "./MemberCard.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from "../api/Firebase";
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
      memberClasses: [],
      members: null,
    };
  }

  componentDidMount() {
    this.getClasses();
    this.getEboard();
  }

  getClasses() {
    this.props.firebase.getConfig().then((doc) => {
      const memberClasses = Object.entries(doc.data().classes)
        .sort((a, b) => (b[1] > a[1] ? 1 : -1))
        .map((c) => c[0]);
      this.setState({ memberClasses }, this.getMembers);
    });
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

  getMembers() {
    const { classes } = this.props;

    const members = this.state.memberClasses.map(async (className) => {
      const classMembers = await this.props.firebase
        .getClass(className)
        .then((querySnapshot) => {
          const classDocs = querySnapshot.docs.map((doc) => doc.data());
          const classMembers = classDocs.map((item, index) => (
            <MemberCard data={item} key={index} pos={false} />
          ));
          return classMembers;
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
      return (
        <React.Fragment key={className}>
          <Row>
            <Col className="title text-center">
              <h1>{className}</h1>
            </Col>
          </Row>
          <Row className={classes.listings}>{classMembers}</Row>
        </React.Fragment>
      );
    });

    Promise.all(members).then((values) => {
      this.setState({ members: values });
    });
  }

  render() {
    const { classes } = this.props;

    const eboard = this.state.eboard.map((item, index) => (
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

          {this.state.members}
        </Container>
      </div>
    );
  }
}
const MemberList = compose(withFirebase, withStyles(styles))(MemberListBase);

export default MemberList;
