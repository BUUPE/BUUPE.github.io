import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import MemberMngCard from "./MemberMngCard.js";
import AddMember from "./AddMember.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main-site/main.css";

import { withFirebase } from "../../api/Firebase";
import { compose } from "recompose";

const styles = {
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
      alphaClass: [],
      betaClass: [],
      gammaClass: [],
      deltaClass: [],
      alumniClass: [],
      addMember: false,
    };

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
  }

  componentDidMount() {
    this.getAlpha();
    this.getBeta();
    this.getGamma();
    this.getDelta();
    this.getAlumni();
  }

  handleToggleAdd = () => {
    this.setState({
      addMember: !this.state.addMember,
    });
  };

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
      .getClass("Alumni")
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

    const alphaClass = this.state.alphaClass.map((item, index) => (
      <MemberMngCard data={item} key={index} pos={false} />
    ));
    const betaClass = this.state.betaClass.map((item, index) => (
      <MemberMngCard data={item} key={index} pos={false} />
    ));
    const gammaClass = this.state.gammaClass.map((item, index) => (
      <MemberMngCard data={item} key={index} pos={false} />
    ));
    const deltaClass = this.state.deltaClass.map((item, index) => (
      <MemberMngCard data={item} key={index} pos={false} />
    ));
    const alumniClass = this.state.alumniClass.map((item, index) => (
      <MemberMngCard data={item} key={index} pos={true} />
    ));

    return (
      <div>
        <Container className="title">
          <Row className={classes.center}>
            <Col>
              <h1> Member Management Panel </h1>
            </Col>
          </Row>
          <Row className={classes.buttonWrapper}>
            <Col>
              <Button className={classes.btn} onClick={this.handleToggleAdd}>
                Add Member
              </Button>
            </Col>
          </Row>
        </Container>
        <Container className={this.state.addMember ? "" : classes.hidden}>
          <Row>
            <AddMember />
          </Row>
        </Container>
        <Container>
          <Row>
            {alphaClass}
            {betaClass}
            {gammaClass}
            {deltaClass}
            {alumniClass}
          </Row>
        </Container>
      </div>
    );
  }
}
const MemberList = compose(withFirebase, withStyles(styles))(MemberListBase);

export default MemberList;
