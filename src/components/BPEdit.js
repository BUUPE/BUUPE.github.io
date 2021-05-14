import React, { Component } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";
import { withStyles } from "@material-ui/styles";

const styles = {
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
  fileUpload: {
    textAlign: "center",
  },
};

const INITIAL_STATE = {
  uid: "",
  bp: 0,
  rp: 0,
  error: null,
};

class BPEditBase extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.props.firebase.getUID(this.props.value.email).then((snapshot) => {
      this.setState({ uid: snapshot.data().value });
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { rp, bp } = this.state;

    const data = {
      upe: {
        bp: parseInt(this.props.value.upe.bp) + parseInt(bp) + parseInt(rp),
        rp: parseInt(this.props.value.upe.rp) + parseInt(rp),
      },
    };

    this.props.firebase
      .editUser(this.state.uid, data)
      .then(() => {
        this.props.updateFunc();
      })
      .catch((error) => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { bp, rp, error } = this.state;

    const isInvalid = bp === "" && rp === "";

    return (
      <Form onSubmit={this.onSubmit}>
        <div className={classes.inputWrapper}>
          <h1>Brownie Points</h1>
          <InputGroup>
            <Form.Control
              name="bp"
              type="number"
              placeholder="0"
              value={bp}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>

        <div className={classes.inputWrapper}>
          <h1>Recruitment Points</h1>
          <InputGroup>
            <Form.Control
              name="rp"
              type="number"
              placeholder="0"
              value={rp}
              onChange={this.onChange}
            />
          </InputGroup>
        </div>

        <div className={classes.buttonGroup}>
          <Row>
            <Col>
              <Button disabled={isInvalid} type="submit" className="btn">
                Update Points
              </Button>
            </Col>
          </Row>
        </div>

        {error && <p className="error-msg">{error.message}</p>}
      </Form>
    );
  }
}

const BPEdit = compose(withFirebase, withStyles(styles))(BPEditBase);

export default BPEdit;
