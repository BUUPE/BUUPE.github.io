import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

const styles = {
  card: {
    width: "400px",
    border: 0,
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  wrapper: {
    paddingTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
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
};

const INITIAL_STATE = {
  name: "",
  index: -1,
  memberClasses: [],
  error: null,
};

class AddClassesBase extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.getClasses();
  }

  getClasses() {
    this.props.firebase.getConfig().then((doc) => {
      const indexes = Object.entries(doc.data().classes)
        .sort((a, b) => (b[1] > a[1] ? 1 : -1))
        .map((c) => c[1]);
      this.setState({ index: indexes[0] });
      const memberClasses = doc.data().classes;
      this.setState({ memberClasses });
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { name, index, memberClasses } = this.state;

    const i = index + 1;
    const data = { ...memberClasses, [name]: i };

    this.props.firebase
      .configDoc()
      .update({ classes: data })
      .then(() => {
        console.log("Success");
        this.props.updateFunc();
      })
      .catch((err) => {
        console.log(err);
      });

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const { name, error } = this.state;
    const isInvalid = name === "";

    return (
      <Container className={classes.wrapper}>
        <div className={classes.card}>
          <Form onSubmit={this.onSubmit}>
            <div className={classes.title}>
              <h1>New Class</h1>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Name</h1>
              <InputGroup>
                <Form.Control
                  required
                  name="name"
                  type="text"
                  placeholder="Omega"
                  value={name}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.buttonGroup}>
              <Row>
                <Col>
                  <Button disabled={isInvalid} type="submit" className="btn">
                    Add Class
                  </Button>
                </Col>
              </Row>
            </div>

            {error && <p className="error-msg">{error.message}</p>}
          </Form>
        </div>
      </Container>
    );
  }
}

const AddClass = compose(withFirebase, withStyles(styles))(AddClassesBase);

export default AddClass;
