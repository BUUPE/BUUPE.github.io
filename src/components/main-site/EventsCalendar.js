import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/main-site/calendar.css";

const localizer = momentLocalizer(moment);
const axios = require("axios");

class EventsCalendar extends Component {
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
    axios.get("/api/Events/get").then(res => {
      console.log(res.data);
      this.setState({
        eventsRaw: res.data,
      });
    });
  }

  render() {
    const events = this.state.eventsRaw.map((item, index) => {
      let ev = {};
      ev[index] = {
        id: item.id,
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
    });

    console.log(events);
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
      </Container>
    );
  }
}

export default EventsCalendar;
