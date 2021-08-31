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
  allDay: false,
  changedAllDay: false,
  title: "",
  endHour: 0,
  changedEndHour: false,
  endMinute: 0,
  changedEndMinute: false,
  endDay: 0,
  changedEndDay: false,
  endMonth: 0,
  changedEndMonth: false,
  endYear: 0,
  changedEndYear: false,
  startHour: 0,
  changedStartHour: false,
  startMinute: 0,
  changedStartMinute: false,
  startDay: 0,
  changedStartDay: false,
  startMonth: 0,
  changedStartMonth: false,
  startYear: 0,
  changedStartYear: false,
  invalidMsg: "",
  error: null,
  valid: true,
};

class DataEditBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onChange = (event) => {
    console.log(event.target.name);
    if (event.target.name === "endHour") {
      this.setState({
        [event.target.name]: event.target.value,
        changedEndHour: true,
      });
    } else if (event.target.name === "endMinute") {
      this.setState({
        [event.target.name]: event.target.value,
        changedEndMinute: true,
      });
    } else if (event.target.name === "endDay") {
      this.setState({
        [event.target.name]: event.target.value,
        changedEndDay: true,
      });
    } else if (event.target.name === "endMonth") {
      this.setState({
        [event.target.name]: event.target.value,
        changedEndMonth: true,
      });
    } else if (event.target.name === "endYear") {
      this.setState({
        [event.target.name]: event.target.value,
        changedEndYear: true,
      });
    } else if (event.target.name === "startHour") {
      this.setState({
        [event.target.name]: event.target.value,
        changedStartHour: true,
      });
    } else if (event.target.name === "startMinute") {
      this.setState({
        [event.target.name]: event.target.value,
        changedStartMinute: true,
      });
    } else if (event.target.name === "startDay") {
      this.setState({
        [event.target.name]: event.target.value,
        changedStartDay: true,
      });
    } else if (event.target.name === "startMonth") {
      this.setState({
        [event.target.name]: event.target.value,
        changedStartMonth: true,
      });
    } else if (event.target.name === "startYear") {
      this.setState({
        [event.target.name]: event.target.value,
        changedStartYear: true,
      });
    } else if (event.target.name === "allDay") {
      this.setState({
        [event.target.name]: event.target.value,
        changedAllDay: true,
      });
    } else {
      this.setState({ [event.target.name]: event.target.value });
    }
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
    const {
      allDay,
      changedAllDay,
      title,
      endHour,
      changedEndHour,
      endMinute,
      changedEndMinute,
      endDay,
      changedEndDay,
      endMonth,
      changedEndMonth,
      endYear,
      changedEndYear,
      startHour,
      changedStartHour,
      startMinute,
      changedStartMinute,
      startDay,
      changedStartDay,
      startMonth,
      changedStartMonth,
      startYear,
      changedStartYear,
      valid,
    } = this.state;

    var eH = this.props.value.endHour;
    if (changedEndHour) eH = endHour;

    var eMin = this.props.value.endMinute;
    if (changedEndMinute) eMin = endMinute;

    var eD = this.props.value.endDay;
    if (changedEndDay) eD = endDay;

    var eMon = this.props.value.endMonth;
    if (changedEndMonth) eMon = endMonth;

    var eY = this.props.value.endYear;
    if (changedEndYear) eY = endYear;

    var sH = this.props.value.startHour;
    if (changedStartHour) sH = startHour;

    var sMin = this.props.value.startMinute;
    if (changedStartMinute) sMin = startMinute;

    var sD = this.props.value.startDay;
    if (changedStartDay) sD = startDay;

    var sMon = this.props.value.startMonth;
    if (changedStartMonth) sMon = startMonth;

    var sY = this.props.value.startYear;
    if (changedStartYear) sY = startYear;

    var aD = this.props.value.allDay;
    if (changedAllDay) aD = allDay;

    var t = this.props.value.title;
    if (title !== "") t = title;

    this.validateDate();

    const data = {
      title: t,
      allDay: aD,
      startHour: sH,
      startMinute: sMin,
      startDay: sD,
      startMonth: sMon,
      startYear: sY,
      endHour: eH,
      endMinute: eMin,
      endDay: eD,
      endMonth: eMon,
      endYear: eY,
    };
    if (valid) {
      this.props.firebase
        .editEvent(this.props.doc.id, data)
        .then(() => {
          this.props.updateFunc();
        })
        .catch((error) => {
          this.setState({ error });
        });
    } else {
      this.setState({ invalidMsg: "Invalid Month/Day combination" });
    }

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const {
      invalidMsg,
      error,
      allDay,
      changedAllDay,
      title,
      endHour,
      changedEndHour,
      endMinute,
      changedEndMinute,
      endDay,
      changedEndDay,
      endMonth,
      changedEndMonth,
      endYear,
      changedEndYear,
      startHour,
      changedStartHour,
      startMinute,
      changedStartMinute,
      startDay,
      changedStartDay,
      startMonth,
      changedStartMonth,
      startYear,
      changedStartYear,
    } = this.state;
    const isInvalid =
      !changedAllDay &&
      title === "" &&
      !changedEndHour &&
      !changedEndMinute &&
      !changedEndDay &&
      !changedEndMonth &&
      !changedEndYear &&
      !changedStartHour &&
      !changedStartMinute &&
      !changedStartDay &&
      !changedStartMonth &&
      !changedStartYear;

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
      <Form onSubmit={this.onSubmit}>
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
                Update Event
              </Button>
            </Col>
          </Row>
        </div>

        {error && <p className="error-msg">{error.message}</p>}
        {<p className="error-msg">{invalidMsg}</p>}
      </Form>
    );
  }
}

const DataEdit = compose(withFirebase, withStyles(styles))(DataEditBase);

export default DataEdit;
