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
  fileUpload: {
    textAlign: "center",
  },
};

const INITIAL_STATE = {
  allDay: false,
  title: "",
  endHour: 0,
  endMinute: 0,
  endDay: 0,
  endMonth: 0,
  endYear: 0,
  startHour: 0,
  startMinute: 0,
  startDay: 0,
  startMonth: 0,
  startYear: 0,
  invalidMsg: "",
  error: null,
  index: 0,
  valid: true,
};

class AddMemberBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateDate = () => {
    const { endDay, endMonth, startDay, startMonth } = this.state;

    if (endMonth === 4 || endMonth === 5 || endMonth === 9 || endMonth === 11) {
      if (endDay >= 31) {
        this.setState({ valid: false });
      }
    } else if (endMonth === 2) {
      if (endDay >= 29) {
        this.setState({ valid: false });
      }
    }

    if (
      startMonth === 2 ||
      startMonth === 4 ||
      startMonth === 5 ||
      startMonth === 9 ||
      startMonth === 11
    ) {
      if (startDay >= 31) {
        this.setState({ valid: false });
      }
    } else if (endMonth === 2) {
      if (endDay >= 29) {
        this.setState({ valid: false });
      }
    }
  };

  onSubmit = (event) => {
    const { valid } = this.state;

    this.props.firebase
      .getIndex()
      .then((doc) => {
        var docD = doc.data();
        var newIndex = docD.maxIndex + 1;
        this.setState({ index: newIndex });

        const data = {
          index: this.state.index,
          allDay: this.state.allDay,
          title: this.state.title,
          endHour: this.state.endHour,
          endMinute: this.state.endMinute,
          endDay: this.state.endDay,
          endMonth: this.state.endMonth,
          endYear: this.state.endYear,
          startHour: this.state.startHour,
          startMinute: this.state.startMinute,
          startDay: this.state.startDay,
          startMonth: this.state.startMonth,
          startYear: this.state.startYear,
        };

        this.validateDate();

        if (valid) {
          this.props.firebase
            .addEvent(data)
            .then(() => {
              const d = {
                maxIndex: this.state.index,
              };

              this.props.firebase
                .incrementIndex(d)
                .then(() => {
                  this.props.updateFunc();
                })
                .catch((error) => {
                  this.setState({ error });
                });
            })
            .catch((error) => {
              this.setState({ error });
            });
        } else {
          this.setState({ invalidMsg: "Invalid Month/Day combination" });
        }
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
        this.setState({ valid: false });
      });

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const {
      invalidMsg,
      allDay,
      title,
      endHour,
      endMinute,
      endDay,
      endMonth,
      endYear,
      startHour,
      startMinute,
      startDay,
      startMonth,
      startYear,
      error,
    } = this.state;
    const isInvalid =
      title === "" &&
      endDay === 0 &&
      endMonth === 0 &&
      startDay === 0 &&
      startMonth === 0 &&
      startYear === 0 &&
      endYear === 0;

    const year = new Date().getFullYear();
    const hours = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
    ];
    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const days = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
    ];
    const years = [];
    for (let i = year; i <= year + 2; i++) {
      years.push(i);
    }

    return (
      <Container className={classes.wrapper}>
        <div className={classes.card}>
          <Form onSubmit={this.onSubmit}>
            <div className={classes.title}>
              <h1>New Event</h1>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Title</h1>
              <InputGroup>
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="..."
                  value={title}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>All Day</h1>
              <InputGroup>
                <Form.Control
                  name="allDay"
                  type="boolean"
                  value={allDay}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Start Hour</h1>
              <InputGroup>
                <Form.Control
                  name="startHour"
                  as="select"
                  value={startHour}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {hours.map((hour) => (
                    <option key={hour}>{hour}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Start Minute</h1>
              <InputGroup>
                <Form.Control
                  name="startMinute"
                  as="select"
                  value={startMinute}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {minutes.map((minute) => (
                    <option key={minute}>{minute}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Start Day</h1>
              <InputGroup>
                <Form.Control
                  name="startDay"
                  as="select"
                  value={startDay}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {days.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Start Month</h1>
              <InputGroup>
                <Form.Control
                  name="startMonth"
                  as="select"
                  value={startMonth}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Start Year</h1>
              <InputGroup>
                <Form.Control
                  name="startYear"
                  as="select"
                  value={startYear}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>End Hour</h1>
              <InputGroup>
                <Form.Control
                  name="endHour"
                  as="select"
                  value={endHour}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {hours.map((hour) => (
                    <option key={hour}>{hour}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>End Minute</h1>
              <InputGroup>
                <Form.Control
                  name="endMinute"
                  as="select"
                  value={endMinute}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {minutes.map((minute) => (
                    <option key={minute}>{minute}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>End Day</h1>
              <InputGroup>
                <Form.Control
                  name="endDay"
                  as="select"
                  value={endDay}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {days.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>End Month</h1>
              <InputGroup>
                <Form.Control
                  name="endMonth"
                  as="select"
                  value={endMonth}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {months.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>End Year</h1>
              <InputGroup>
                <Form.Control
                  name="endYear"
                  as="select"
                  value={endYear}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.buttonGroup}>
              <Row>
                <Col>
                  <Button disabled={isInvalid} type="submit" className="btn">
                    Add Event
                  </Button>
                </Col>
              </Row>
            </div>

            {error && <p className="error-msg">{error.message}</p>}
            {<p className="error-msg">{invalidMsg}</p>}
          </Form>
        </div>
      </Container>
    );
  }
}

const AddMember = compose(withFirebase, withStyles(styles))(AddMemberBase);

export default AddMember;
