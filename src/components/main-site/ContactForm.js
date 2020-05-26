import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { withStyles } from "@material-ui/styles";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main-site/main.css";

const styles = {
  contactFormh5: {
    fontFamily: "Gruppo",
    fontWeight: 1000,
    fontSize: "35px",
    paddingTop: "15px",
  },
  contactForm: {
    fontFamily: "Andale Mono, monospace",
    paddingBottom: "40px",
  },
  contactFormButtonGroup: {
    paddingTop: "50px",
    textAlign: "center",
  },
  contactFormBtn: {
    backgroundColor: "#f21131",
    borderColor: "#f21131",
    fontFamily: "Gruppo",
    fontWeight: 800,
    fontSize: "20px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
    },
  },
};

const axios = require("axios");
const INITIAL_STATE = {
  email: "",
  name: "",
  subject: "",
  message: "",
  submitted: false,
  validated: false,
  error: null,
};

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      axios
        .post("/api/email/contactForm", {
          email: this.state.email,
          name: this.state.name,
          subject: this.state.subject,
          message: this.state.message,
        })
        .then(res => console.log(res))
        .catch(error => console.error(error));

      this.setState({ submitted: true });
      console.log(this.state);
    }

    this.setState({ validated: true });
  };

  render() {
    const { classes } = this.props;

    const {
      email,
      name,
      subject,
      message,
      validated,
      error,
    } = this.state;

    return (
      <Form
        noValidate
        validated={validated}
        onSubmit={this.onSubmit}
        className={classes.contactForm}
      >
        <Row>
          <Col>
            <h5 className={classes.contactFormh5}>Name</h5>
            <InputGroup>
              <Form.Control
                name="name"
                type="text"
                placeholder="Adam Smith"
                value={name}
                onChange={this.onChange}
                required
              />
            </InputGroup>
          </Col>
          <Col>
            <h5 className={classes.contactFormh5}>Email</h5>
            <InputGroup>
              <Form.Control
                name="email"
                type="email"
                placeholder="upe@bu.edu"
                value={email}
                onChange={this.onChange}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5 className={classes.contactFormh5}>Subject</h5>
            <InputGroup>
              <Form.Control
                name="subject"
                as="textarea"
                rows="1"
                placeholder="..."
                value={subject}
                onChange={this.onChange}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <h5 className={classes.contactFormh5}>Message</h5>
            <InputGroup>
              <Form.Control
                name="message"
                as="textarea"
                rows="7"
                placeholder="..."
                value={message}
                onChange={this.onChange}
                required
              />
            </InputGroup>
          </Col>
        </Row>

        <Row className={classes.contactFormButtonGroup}>
          <Col>
            <Button
              type="submit"
              onSubmit={this.onSubmit}
              className={classes.contactFormBtn}
            >
              Send Email
            </Button>
          </Col>
        </Row>

        {error && <p className="error-msg">{error.message}</p>}
      </Form>
    );
  }
}

export default withStyles(styles)(ContactForm);
