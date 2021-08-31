import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/calendar.css";

const localizer = momentLocalizer(moment);

class EventsCalendarBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsRaw: [],
    };
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    this.props.firebase
      .getEvents()
      .then((querySnapshot) => {
        const eventsRaw = querySnapshot.docs.map((doc) => doc.data());
        this.setState({ eventsRaw });
      })
      .catch((error) => {
        console.error("Error getting documents: ", error);
      });
  }

  render() {
    const events = this.state.eventsRaw.map((item, index) => {
      if (item.allDay) {
        const ev = {
          id: item.index,
          title: item.title,
          allDay: item.allDay,
          start: new Date(
            item.startYear,
            item.startMonth - 1,
            item.startDay,
            item.startHour,
            item.startMinute,
            0,
            0
          ),
          end: new Date(
            item.endYear,
            item.endMonth - 1,
            item.endDay,
            item.endHour,
            item.endMinute,
            0,
            0
          ),
        };
        return ev;
      } else {
        const ev = {
          id: item.index,
          title: item.title,
          start: new Date(
            item.startYear,
            item.startMonth - 1,
            item.startDay,
            item.startHour,
            item.startMinute,
            0,
            0
          ),
          end: new Date(
            item.endYear,
            item.endMonth - 1,
            item.endDay,
            item.endHour,
            item.endMinute,
            0,
            0
          ),
        };
        return ev;
      }
    });

    return (
      <Container className="calendar">
        <div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.MONTH}
            views={{ month: true, week: true }}
            style={{ height: 500 }}
          />
        </div>
        <br />
        <h6>
          {" "}
          All events hosted on Zoom, click{" "}
          <a href="http://recruitment-events.vtr.pt/">here</a> to join.{" "}
        </h6>
      </Container>
    );
  }
}

const EventsCalendar = compose(withFirebase)(EventsCalendarBase);

export default EventsCalendar;
