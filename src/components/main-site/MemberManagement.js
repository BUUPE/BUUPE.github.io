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
      members: [],
      addMember: false,
    };

    this.handleToggleAdd = this.handleToggleAdd.bind(this);
  }

  componentDidMount() {
    this.getMembers();
  }

  handleToggleAdd = () => {
    this.setState({
      addMember: !this.state.addMember,
    });
  };

  getMembers() {
    this.props.firebase
      .getMembers()
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
      <MemberMngCard data={item} key={index} pos={false} />
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
            {members}
          </Row>
        </Container>
      </div>
    );
  }
}
const MemberList = compose(withFirebase, withStyles(styles))(MemberListBase);

export default MemberList;
