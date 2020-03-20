import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/main-site/members.css';

const axios = require('axios');

class MemberList extends Component {
  constructor(props) {
    super(props);
    this.state = {
		eboard: [],
		alphaClass : [],
		betaClass : [],
		gammaClass : [],
		deltaClass : [],
		alumniClass: []
	}
	
  }
  
  componentDidMount() {
	this.getEboard();
	this.getAlpha();
	this.getBeta();
	this.getGamma();
	this.getDelta();
	this.getAlumni();
  }
  
  getEboard() {
    axios.get('/api/Classes/get/Eboard').then((res) => {
      this.setState({
        eboard: res.data,
      }) 
    })
  };
  
  getAlpha() {
    axios.get('/api/Classes/get/Alpha').then((res) => {
      this.setState({
        alphaClass: res.data,
      }) 
    })
  };
  
  getBeta() {
    axios.get('/api/Classes/get/Beta').then((res) => {
      this.setState({
        betaClass: res.data,
      }) 
    })
  };
  
  getGamma() {
    axios.get('/api/Classes/get/Gamma').then((res) => {
      this.setState({
        gammaClass: res.data,
      }) 
    })
  };
  
  getDelta() {
    axios.get('/api/Classes/get/Delta').then((res) => {
      this.setState({
        deltaClass: res.data,
      }) 
    })
  };
  
  getAlumni() {
    axios.get('/api/Classes/get/Alumni').then((res) => {
      this.setState({
        alumniClass: res.data,
      }) 
    })
  };

  render () {
    const eboard = this.state.eboard.map((item, index)=>{
	  var position = '';
	  if (item.position != null) {
		  position = item.position;
	  }

	  var hasGit = false;
	  var hasTwit = false;
	  var hasFace = false;
	  var hasIN = false;
	  if (item.github != null) {
		  hasGit = true;
	  }
	  if (item.twitter != null) {
		  hasTwit = true;
	  }
	  if (item.facebook != null) {
		  hasFace = true;
	  }
	  if (item.linkedin != null) {
		  hasIN = true;
	  }
	  var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	  
      return (
		<Col key={index} className="memberList">
			<div className="card">
				<img className="card-img-top rounded-circle" src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<h6 class="card-subtitle">Class of {item.classYear}</h6>
					<p class="card-text text-muted">{position}</p>
					<div className={hasSocial ? 'text-center socialLinks' : 'hidden'}>
						<hr />
						<a className={hasGit ? '' : 'hidden'} href={item.github}><FontAwesomeIcon className="socialLink" icon={ faGithub } /></a>
						<a className={hasTwit ? '' : 'hidden'} href={item.twitter}><FontAwesomeIcon className="socialLink" icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : 'hidden'} href={item.facebook}><FontAwesomeIcon className="socialLink" icon={ faFacebook } /></a>
						<a className={hasIN ? '' : 'hidden'} href={item.linkedin}><FontAwesomeIcon className="socialLink" icon={ faLinkedin } /></a>
					</div>
				</div>
			</div>
		</Col>
	  );
    });


    const alphaClass = this.state.alphaClass.map((item, index)=>{
	  var position = '';

	  var hasGit = false;
	  var hasTwit = false;
	  var hasFace = false;
	  var hasIN = false;
	  if (item.github != null) {
		  hasGit = true;
	  }
	  if (item.twitter != null) {
		  hasTwit = true;
	  }
	  if (item.facebook != null) {
		  hasFace = true;
	  }
	  if (item.linkedin != null) {
		  hasIN = true;
	  }
	  var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	  
      return (
		<Col key={index} className="memberList">
			<div className="card">
				<img className="card-img-top rounded-circle" src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<h6 class="card-subtitle">Class of {item.gradYear}</h6>
					<p class="card-text text-muted">{position}</p>
					<div className={hasSocial ? 'text-center socialLinks' : 'hidden'}>
						<hr />
						<a className={hasGit ? '' : 'hidden'} href={item.github}><FontAwesomeIcon className="socialLink" icon={ faGithub } /></a>
						<a className={hasTwit ? '' : 'hidden'} href={item.twitter}><FontAwesomeIcon className="socialLink" icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : 'hidden'} href={item.facebook}><FontAwesomeIcon className="socialLink" icon={ faFacebook } /></a>
						<a className={hasIN ? '' : 'hidden'} href={item.linkedin}><FontAwesomeIcon className="socialLink" icon={ faLinkedin } /></a>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const betaClass = this.state.betaClass.map((item, index)=>{
	  var position = '';

	  var hasGit = false;
	  var hasTwit = false;
	  var hasFace = false;
	  var hasIN = false;
	  if (item.github != null) {
		  hasGit = true;
	  }
	  if (item.twitter != null) {
		  hasTwit = true;
	  }
	  if (item.facebook != null) {
		  hasFace = true;
	  }
	  if (item.linkedin != null) {
		  hasIN = true;
	  }
	  var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	  
      return (
		<Col key={index} className="memberList">
			<div className="card">
				<img className="card-img-top rounded-circle" src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<h6 class="card-subtitle">Class of {item.gradYear}</h6>
					<p class="card-text text-muted">{position}</p>
					<div className={hasSocial ? 'text-center socialLinks' : 'hidden'}>
						<hr />
						<a className={hasGit ? '' : 'hidden'} href={item.github}><FontAwesomeIcon className="socialLink" icon={ faGithub } /></a>
						<a className={hasTwit ? '' : 'hidden'} href={item.twitter}><FontAwesomeIcon className="socialLink" icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : 'hidden'} href={item.facebook}><FontAwesomeIcon className="socialLink" icon={ faFacebook } /></a>
						<a className={hasIN ? '' : 'hidden'} href={item.linkedin}><FontAwesomeIcon className="socialLink" icon={ faLinkedin } /></a>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const gammaClass = this.state.gammaClass.map((item, index)=>{
	  var position = '';

	  var hasGit = false;
	  var hasTwit = false;
	  var hasFace = false;
	  var hasIN = false;
	  if (item.github != null) {
		  hasGit = true;
	  }
	  if (item.twitter != null) {
		  hasTwit = true;
	  }
	  if (item.facebook != null) {
		  hasFace = true;
	  }
	  if (item.linkedin != null) {
		  hasIN = true;
	  }
	  var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	  
      return (
		<Col key={index} className="memberList">
			<div className="card">
				<img className="card-img-top rounded-circle" src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<h6 class="card-subtitle">Class of {item.gradYear}</h6>
					<p class="card-text text-muted">{position}</p>
					<div className={hasSocial ? 'text-center socialLinks' : 'hidden'}>
						<hr />
						<a className={hasGit ? '' : 'hidden'} href={item.github}><FontAwesomeIcon className="socialLink" icon={ faGithub } /></a>
						<a className={hasTwit ? '' : 'hidden'} href={item.twitter}><FontAwesomeIcon className="socialLink" icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : 'hidden'} href={item.facebook}><FontAwesomeIcon className="socialLink" icon={ faFacebook } /></a>
						<a className={hasIN ? '' : 'hidden'} href={item.linkedin}><FontAwesomeIcon className="socialLink" icon={ faLinkedin } /></a>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const deltaClass = this.state.deltaClass.map((item, index)=>{
	  var position = '';

	  var hasGit = false;
	  var hasTwit = false;
	  var hasFace = false;
	  var hasIN = false;
	  if (item.github != null) {
		  hasGit = true;
	  }
	  if (item.twitter != null) {
		  hasTwit = true;
	  }
	  if (item.facebook != null) {
		  hasFace = true;
	  }
	  if (item.linkedin != null) {
		  hasIN = true;
	  }
	  var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	  
      return (
		<Col key={index} className="memberList">
			<div className="card">
				<img className="card-img-top rounded-circle" src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<h6 class="card-subtitle">Class of {item.gradYear}</h6>
					<p class="card-text text-muted">{position}</p>
					<div className={hasSocial ? 'text-center socialLinks' : 'hidden'}>
						<hr />
						<a className={hasGit ? '' : 'hidden'} href={item.github}><FontAwesomeIcon className="socialLink" icon={ faGithub } /></a>
						<a className={hasTwit ? '' : 'hidden'} href={item.twitter}><FontAwesomeIcon className="socialLink" icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : 'hidden'} href={item.facebook}><FontAwesomeIcon className="socialLink" icon={ faFacebook } /></a>
						<a className={hasIN ? '' : 'hidden'} href={item.linkedin}><FontAwesomeIcon className="socialLink" icon={ faLinkedin } /></a>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const alumniClass = this.state.alumniClass.map((item, index)=>{
	  var position = '';
	  if (item.position != null) {
		  position = item.position;
	  }

	  var hasGit = false;
	  var hasTwit = false;
	  var hasFace = false;
	  var hasIN = false;
	  if (item.github != null) {
		  hasGit = true;
	  }
	  if (item.twitter != null) {
		  hasTwit = true;
	  }
	  if (item.facebook != null) {
		  hasFace = true;
	  }
	  if (item.linkedin != null) {
		  hasIN = true;
	  }
	  var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	  
      return (
		<Col key={index} className="memberList">
			<div className="card">
				<img className="card-img-top rounded-circle" src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className="card-title">{item.name}</h5>
					<h6 class="card-subtitle">Class of {item.gradYear}</h6>
					<p class="card-text text-muted">{position}</p>
					<div className={hasSocial ? 'text-center socialLinks' : 'hidden'}>
						<hr />
						<a className={hasGit ? '' : 'hidden'} href={item.github}><FontAwesomeIcon className="socialLink" icon={ faGithub } /></a>
						<a className={hasTwit ? '' : 'hidden'} href={item.twitter}><FontAwesomeIcon className="socialLink" icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : 'hidden'} href={item.facebook}><FontAwesomeIcon className="socialLink" icon={ faFacebook } /></a>
						<a className={hasIN ? '' : 'hidden'} href={item.linkedin}><FontAwesomeIcon className="socialLink" icon={ faLinkedin } /></a>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
	
    return(
	  <div>
		<Container>
			<Row>
				<Col className="title text-center">
					<h1>Officers</h1>
				</Col>
			</Row>
			<Row className="listings">
				{ eboard }
			</Row>
			<Row>
				<Col className="title text-center">
					<h1>Alpha Class</h1>
				</Col>
			</Row>
			<Row className="listings">
				{ alphaClass }
			</Row>
			<Row>
				<Col className="title text-center">
					<h1>Beta Class</h1>
				</Col>
			</Row>
			<Row className="listings">
				{ betaClass }
			</Row>
			<Row>
				<Col className="title text-center">
					<h1>Gamma Class</h1>
				</Col>
			</Row>
			<Row className="listings">
				{ gammaClass }
			</Row>
			<Row>
				<Col className="title text-center">
					<h1>Delta Class</h1>
				</Col>
			</Row>
			<Row className="listings">
				{ deltaClass }
			</Row>
			<Row>
				<Col className="title text-center">
					<h1>Alumni</h1>
				</Col>
			</Row>
			<Row className="listings">
				{ alumniClass }
			</Row>
		</Container>
	  </div>
	);
  }
}

export default MemberList;