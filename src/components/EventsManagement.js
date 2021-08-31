import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import EventMngCard from "./EventMngCard.js";
import AddEvent from "./AddEvent.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

const styles = {
  spacer: {
    height: "500px",
  },
  center: {
    textAlign: "center",
  },
  hidden: {
    display: "none",
  },
  btn: {
    backgroundColor: "#f21131",
    borderColor: "#f21131",
    fontFamily: "Gruppo",
    fontWeight: "800",
    fontSize: "15px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
    },
  },
  buttonWrapper: {
    paddingBottom: "5px",
    textAlign: "right",
  },
};

class MemberListBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      addEvent: false,
    };

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  handleToggleAdd = () => {
    this.setState({
      addEvent: !this.state.addEvent,
    });
  };

  getEvents() {
    this.props.firebase
      .getEvents()
      .then((querySnapshot) => {
        const events = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ events });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });

    this.setState({ addEvent: false });
  }

  render() {
    const { classes } = this.props;

    const events = this.state.events.map((item, index) => (
      <EventMngCard data={item} key={index} updateFunc={this.getEvents} />
    ));

    return (
      <div>
        <Container className="title">
          <Row className={classes.center}>
            <Col>
              <h1> Event Management Panel </h1>
            </Col>
          </Row>
          <Row className={classes.buttonWrapper}>
            <Col>
              <Button className={classes.btn} onClick={this.handleToggleAdd}>
                Add Event
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className={this.state.addEvent ? "" : classes.hidden}>
          <Row>
            <AddEvent updateFunc={this.getEvents} />
          </Row>
        </Container>
        <Container>
          <Row>{events}</Row>
        </Container>

        <Container className={classes.spacer}></Container>
      </div>
    );
  }
}
const MemberList = compose(withFirebase, withStyles(styles))(MemberListBase);

export default MemberList;
