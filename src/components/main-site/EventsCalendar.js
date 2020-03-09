import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main-site/calendar.css';


const localizer = momentLocalizer(moment)
const axios = require('axios');
const now = new Date()

class EventsCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
		events: 
		[  
		  {
			id: 0,
			title: 'Info Session 1',
			allDay: false,
			start: new Date(2020, 2, 14, 17, 30, 0),
			end: new Date(2020, 2, 14, 20, 30, 0),
		  },
		]
	}
  }
  render () {
	var d = new Date();
	var m = d.getMonth();
	var y = d.getYear();
	
    return(
	  <Container className="calendar">
		<div>
		  <Calendar
			localizer={localizer}
			events={this.state.events}
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