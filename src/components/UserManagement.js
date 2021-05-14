import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import UserMngCard from "./UserMngCard.js";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

const styles = {
  container: {
    paddingBottom: "20px",
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
  buttonWrapper2: {
    paddingBottom: "5px",
    textAlign: "left",
  },
};

class UserManagementBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
    };

    this.getMembers = this.getMembers.bind(this);
  }

  componentDidMount() {
    this.getMembers();
  }

  getMembers() {
    this.props.firebase
      .getNonMembers()
      .then((querySnapshot) => {
        const members = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ members });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  render() {
    const { classes } = this.props;

    const members = this.state.members.map((item, index) => (
      <UserMngCard
        data={item}
        key={index}
        pos={false}
        updateFunc={this.getMembers}
      />
    ));

    return (
      <div>
        <Container className="title">
          <Row className={classes.center}>
            <Col>
              <h1> Non-Member Management Panel </h1>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>{members}</Row>
        </Container>
      </div>
    );
  }
}
const UserManagement = compose(
  withFirebase,
  withStyles(styles)
)(UserManagementBase);

export default UserManagement;
