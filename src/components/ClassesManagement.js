import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import AddClass from "./AddClass.js";
import ClassesMngCard from "./ClassesMngCard.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

const styles = {
  background: {
    backgroundColor: "#f6f6f6",
    borderRadius: "25px",
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

class ClassListBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberClasses: [],
      addClasses: false,
    };

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
    this.getClasses = this.getClasses.bind(this);
  }

  componentDidMount() {
    this.getClasses();
  }

  handleToggleAdd = () => {
    this.setState({
      addClasses: !this.state.addClasses,
    });
  };

  getClasses() {
    this.props.firebase.getConfig().then((doc) => {
      const memberClasses = Object.entries(doc.data().classes)
        .sort((a, b) => (b[1] > a[1] ? 1 : -1))
        .map((c) => c[0]);
      this.setState({ memberClasses });
    });

    this.setState({ addClasses: false });
  }

  render() {
    const { classes } = this.props;

    const memberClasses = this.state.memberClasses.map((item, index) => (
      <ClassesMngCard data={item} key={index} updateFunc={this.getClasses} />
    ));

    return (
      <div className={classes.background}>
        <Container className="title">
          <Row className={classes.center}>
            <Col>
              <h1> Classes Management </h1>
            </Col>
          </Row>
          <Row>
            <Col className={classes.buttonWrapper}>
              <Button className={classes.btn} onClick={this.handleToggleAdd}>
                Add Class
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className={this.state.addClasses ? "" : classes.hidden}>
          <Row>
            <AddClass updateFunc={this.getClasses} />
          </Row>
        </Container>
        <Container>
          <Row>{memberClasses}</Row>
        </Container>
      </div>
    );
  }
}
const ClassList = compose(withFirebase, withStyles(styles))(ClassListBase);

export default ClassList;
