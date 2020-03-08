import React, { Component } from 'react';
//import Button from 'react-bootstrap/Button';
//import Row from 'react-bootstrap/Row'
//import Col from 'react-bootstrap/Col'

//import {member} from './Classes/member'
//import {} from './Classes/member'

import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main-site/main.css';

const axios = require('axios');

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
		classes : []
	}
  }
  
  getClasses(e){
    e.preventDefault();
    axios.get('/api/getClasses').then((res) => {
      console.log(res.data);
      this.setState({
        classes: res.data,
      }) 
    })
  };

  render () {
    const dataPost = this.state.classes.map((item, index)=>{
      var array = ['ClassName: ', item.className,', DB: ', item.db].join(' ');
      return <p key={index}>{array}</p>;
    });
	
    return(
	<div>
	  <button className="btn btn-success" style={{margin:'15px',width:'100px'}}
  onClick={this.getClasses.bind(this)}>GET</button>
      <div>
       { dataPost }
     </div>
	 </div>
	);
  }
}

export default MemberList;