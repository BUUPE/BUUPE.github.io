import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { withStyles } from "@material-ui/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

import DataForm from "./DataForm";

const styles = {
  padding: {
    paddingTop: "25px",
  },
  hidden: {
    display: "none",
  },
  img: {
    width: "75%",
    borderRadius: "100px",
    border: "5px solid #f21131",
  },
  textMain: {
    paddingTop: "50px",
    fontFamily: "Andale Mono, monospace",
    color: "#333",
    "& h1": {
      fontSize: "35px",
      fontWeight: 600,
    },
    "& h2": {
      fontSize: "30px",
      fontWeight: 600,
    },
    "& h3": {
      fontSize: "25px",
    },
  },
  red: {
    color: "#f21131",
  },
  spacer: {
    paddingBottom: "50px",
    paddingTop: "50px",
    "& hr": {
      borderTop: "5px solid #333",
      borderRadius: "5px",
      width: "75%",
    },
  },
  textSecond: {
    textAlign: "center",
    paddingBottom: "75px",
    fontFamily: "Andale Mono, monospace",
    color: "#333",
    "& h4": {
      fontSize: "20px",
    },
  },
};

class UserPanelBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "",
      editInfo: false,
      name: "",
      eboardS: "",
      pos: "",
      git: "",
      face: "",
      tw: "",
      lin: "",
    };

    this.handleToggleInfo = this.handleToggleInfo.bind(this);
    this.getData = this.getData.bind(this);
  }

  getData = () => {
    this.getUrl();
    this.getUser();
  };

  componentDidMount() {
    this.getData();
  }

  getUrl() {
    this.props.firebase
      .getImage(this.props.value.upe.class, this.props.value.profileIMG)
      .then((url) => {
        this.setState({ url });
      });
  }

  getUser() {
    this.props.firebase
      .user(this.props.value.uid)
      .get()
      .then((snapshot) => {
        const item = snapshot.data();

        var eboardS = "Not EBoard";
        var pos = "Not Listed";
        var git = "Not Listed";
        var face = "Not Listed";
        var tw = "Not Listed";
        var lin = "Not Listed";
        var name = item.name;

        if (item.roles && !!item.roles.eboard) {
          eboardS = "On EBoard";
        }
        if (item.upe && !!item.upe.position) {
          pos = item.upe.position;
        }
        if (item.socials && !!item.socials.github) {
          git = item.socials.github;
        }
        if (item.socials && !!item.socials.twitter) {
          tw = item.socials.twitter;
        }
        if (item.socials && !!item.socials.facebook) {
          face = item.socials.facebook;
        }
        if (item.socials && !!item.socials.linkedin) {
          lin = item.socials.linkedin;
        }
        this.setState({
          name: name,
          eboardS: eboardS,
          pos: pos,
          git: git,
          tw: tw,
          face: face,
          lin: lin,
          editInfo: false,
        });
      });
  }

  handleToggleInfo = () => {
    this.setState({
      editInfo: !this.state.editInfo,
    });
  };

  render() {
    const { classes } = this.props;
    const { eboardS, pos, git, tw, face, lin, name } = this.state;

    var defaultIMG =
      "https://firebasestorage.googleapis.com/v0/b/upe-website-fa07a.appspot.com/o/default.png?alt=media&token=6cced97e-fb1e-4604-8b5b-81318a52fcc2";

    return (
      <Container className={classes.padding}>
        <Row className={classes.textMain}>
          <Col>
            <img
              className={classes.img}
              src={this.state.url || defaultIMG}
              alt="Member"
            />
          </Col>
          <Col>
            <h1>
              {" "}
              <span className={classes.red}>Name</span>: {name}{" "}
            </h1>
            <h2>
              {" "}
              <span className={classes.red}>Class</span>:{" "}
              {this.props.value.upe.class}{" "}
            </h2>
            <h2>
              {" "}
              <span className={classes.red}>Graduation Year</span>:{" "}
              {this.props.value.gradYear}{" "}
            </h2>

            <br />

            <h3>
              {" "}
              <span className={classes.red}>Email</span>:{" "}
              {this.props.value.email}{" "}
            </h3>
            <h3>
              {" "}
              <span className={classes.red}>Password</span>: *****{" "}
            </h3>
          </Col>
        </Row>

        <Row className={classes.spacer}>
          <Col>
            <hr />
          </Col>
        </Row>

        <Row className={classes.textSecond}>
          <Col>
            <h4>
              {" "}
              <span className={classes.red}>E-Board Status</span>: {eboardS}{" "}
            </h4>
            <h4>
              {" "}
              <span className={classes.red}>Position</span>: {pos}{" "}
            </h4>

            <h4>
              {" "}
              <span className={classes.red}>Brownie Points</span>:{" "}
              {this.props.value.upe.bp}{" "}
            </h4>
            <h4>
              {" "}
              <span className={classes.red}>Recruitment Points</span>:{" "}
              {this.props.value.upe.rp}{" "}
            </h4>
          </Col>
          <Col>
            <h4>
              {" "}
              <span className={classes.red}>Facebook</span>: {face}{" "}
            </h4>
            <h4>
              {" "}
              <span className={classes.red}>Twitter</span>: {tw}{" "}
            </h4>
            <h4>
              {" "}
              <span className={classes.red}>Github</span>: {git}{" "}
            </h4>
            <h4>
              {" "}
              <span className={classes.red}>LinkedIn</span>: {lin}{" "}
            </h4>
          </Col>
        </Row>

        <Row className="buttonBlock text-center">
          <Col>
            <Button
              className="btn btn-about"
              onClick={this.handleToggleInfo}
              type="button"
            >
              Edit Info
            </Button>
          </Col>
        </Row>

        <Row>
          <Col
            className={this.state.editInfo ? classes.cardText : classes.hidden}
          >
            <DataForm value={this.props.value} updateFunc={this.getData} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const UserPanel = compose(withFirebase, withStyles(styles))(UserPanelBase);

export default UserPanel;
