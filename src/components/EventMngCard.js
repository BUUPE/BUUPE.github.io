import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { withStyles } from "@material-ui/styles";
import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

import EventEdit from "./EventEdit.js";

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  cardImgTop: {
    width: "75%",
    margin: "10% auto",
    borderRadius: "150px",
  },
  card: {
    width: "300px",
    border: "0",
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  cardTitle: {
    fontSize: "30px",
    fontFamily: "Gruppo",
    fontWeight: 1000,
  },
  cardSubtitle: {
    fontSize: "25px",
    fontFamily: "Gruppo",
    fontWeight: 1000,
    color: "#f21131",
  },
  cardText: {
    paddingTop: "5px",
    fontFamily: "Andale Mono, monospace",
  },
  memberList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  buttons: {
    "& hr": {
      borderTop: "3px solid #333",
      borderRadius: "2px",
    },
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
  },
  hidden: {
    display: "none",
  },
};

class EventMngCardBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doc: "",
      editEvent: false,
      deleteEvent: false,
    };

    this.handleToggleEdit = this.handleToggleEdit.bind(this);
    this.handleToggleDelete = this.handleToggleDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);
    this.updateSubFunc = this.updateSubFunc.bind(this);
  }

  updateSubFunc = () => {
    this.props.updateFunc();
    this.setState({ editEvent: false, deleteEvent: false });
  };

  componentDidMount() {
    this.props.firebase
      .getEvent(this.props.data.index)
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        this.setState({ doc: docs[0] });
      });
  }

  handleToggleEdit = () => {
    this.setState({
      editEvent: !this.state.editEvent,
    });
  };

  handleToggleDelete = () => {
    this.setState({
      deleteData: !this.state.deleteData,
    });
  };

  deleteData = () => {
    this.props.firebase.deleteEvent(this.state.doc.id);
    this.updateSubFunc();
  };

  render() {
    const { classes } = this.props;

    var item = this.props.data;

    var startDate = new Date(
      item.startYear,
      item.startMonth - 1,
      item.startDay,
      item.startHour,
      item.startMinute,
      0,
      0
    ).toLocaleString();
    var endDate = new Date(
      item.endYear,
      item.endMonth - 1,
      item.endDay,
      item.endHour,
      item.endMinute,
      0,
      0
    ).toLocaleString();

    return (
      <Col data={item} key={this.props.key} className={classes.memberList}>
        <div className={classes.card}>
          <div className="card-body">
            <h5 className={classes.cardTitle}>{item.title}</h5>
            {item.allDay ? (
              <h6 className={classes.cardSubtitle}>All Day</h6>
            ) : (
              <>
                <h6 className={classes.cardSubtitle}> From: {startDate} </h6>
                <h6 className={classes.cardSubtitle}> To: {endDate} </h6>
              </>
            )}
            <div className="text-center">
              <div className={classes.buttons}>
                <hr />
                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleEdit}
                  >
                    Edit Event
                  </Button>
                </div>

                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleDelete}
                  >
                    Delete Event
                  </Button>
                </div>
              </div>

              <div
                className={
                  this.state.editEvent ? classes.buttons : classes.hidden
                }
              >
                <hr />
                <EventEdit
                  doc={this.state.doc}
                  value={this.props.data}
                  updateFunc={this.updateSubFunc}
                />
              </div>

              <div
                className={
                  this.state.deleteData ? classes.buttons : classes.hidden
                }
              >
                <hr />
                <div className={classes.buttonWrapper}>
                  <Button className={classes.btn} onClick={this.deleteData}>
                    Are you Sure??
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const EventMngCard = compose(
  withFirebase,
  withStyles(styles)
)(EventMngCardBase);

export default EventMngCard;
