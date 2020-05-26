import React, { Component } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faTwitterSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { withStyles  } from '@material-ui/styles';

import firebase from  '../../api/firebase.js'

import 'bootstrap/dist/css/bootstrap.min.css';

const styles = {
  listings: {
	paddingBottom: '100px',
  },
  cardImgTop: {
    width: '75%',
    margin: '10% auto',
  },
  card: {
	width: '300px',
    border: '0',
    marginBottom: '25px',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
	textAlign: 'center',
	'&:hover': {
	  '-webkit-transform': 'translateY(-5px)',
	  transform: 'translateY(-5px)',
	  transition: 'all .3s linear',
	},
  },
  cardTitle: {
	fontSize: '30px',
	fontFamily: 'Gruppo',
	fontWeight: 1000,
  },
  cardSubtitle: {
	fontSize: '25px',
	fontFamily: 'Gruppo',
	fontWeight: 1000,
	color: '#f21131',
  },
  cardText: {
	paddingTop: '5px',
	fontFamily: 'Andale Mono, monospace',
  },
  hidden: {
	display: 'none',
  },
  memberList: {
	display: 'flex',
	flexWrap: 'wrap',
   	justifyContent: 'space-around',
  },
  socialLinks: {
	'& hr': {
	  borderTop: '3px solid #333',
	  borderRadius: '2px',
	},
  },
  socialLink: {
	color: '#f21131',
	fontSize: '50px',
	transition: 'all .3s linear',
	paddingLeft: '5px',
	paddingRight: '5px',
    '&:hover': {
	  color: '#C30000',
	  '-webkit-transform': 'translateY(-5px)',
	  transform: 'translateY(-5px)',
	  transition: 'all .3s linear',
    },
  }
};

const axios = require('axios');
const db = firebase.database();
const users = db.child('users');

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
  
  getEboard(){
	const query = users.orderByChild('eboard').equalTo(true)
	
	this.setState({
		eboard: query,
	})
	
  };
  
  getEboard2() {
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
    const { classes } = this.props;
    
	const eboard = this.state.eboard.map((item, index)=>{
	  var position = false;
	  if (item.position != null) {
		  position = true;
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
		<Col key={index} className={classes.memberList}>
			<div className={classes.card}>
				<img className={classes.cardImgTop} src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className={classes.cardTitle}>{item.name}</h5>
					<h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
					<p className={position ? classes.cardText : classes.hidden}>{item.position}</p>
					<div className='text-center'>
					<div className={hasSocial ? classes.socialLinks : classes.hidden}>
						<hr />
						<a className={hasGit ? '' : classes.hidden} href={item.github}><FontAwesomeIcon className={classes.socialLink} icon={ faGithub } /></a>
						<a className={hasTwit ? '' : classes.hidden} href={item.twitter}><FontAwesomeIcon className={classes.socialLink} icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : classes.hidden} href={item.facebook}><FontAwesomeIcon className={classes.socialLink} icon={ faFacebook } /></a>
						<a className={hasIN ? '' : classes.hidden} href={item.linkedin}><FontAwesomeIcon className={classes.socialLink} icon={ faLinkedin } /></a>
					</div>
					</div>
				</div>
			</div>
		</Col>
	  );
    });


    const alphaClass = this.state.alphaClass.map((item, index)=>{
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
		<Col key={index} className={classes.memberList}>
			<div className={classes.card}>
				<img className={classes.cardImgTop} src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className={classes.cardTitle}>{item.name}</h5>
					<h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
					<div className='text-center'>
					<div className={hasSocial ? classes.socialLinks : classes.hidden}>
						<hr />
						<a className={hasGit ? '' : classes.hidden} href={item.github}><FontAwesomeIcon className={classes.socialLink} icon={ faGithub } /></a>
						<a className={hasTwit ? '' : classes.hidden} href={item.twitter}><FontAwesomeIcon className={classes.socialLink} icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : classes.hidden} href={item.facebook}><FontAwesomeIcon className={classes.socialLink} icon={ faFacebook } /></a>
						<a className={hasIN ? '' : classes.hidden} href={item.linkedin}><FontAwesomeIcon className={classes.socialLink} icon={ faLinkedin } /></a>
					</div>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const betaClass = this.state.betaClass.map((item, index)=>{
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
		<Col key={index} className={classes.memberList}>
			<div className={classes.card}>
				<img className={classes.cardImgTop} src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className={classes.cardTitle}>{item.name}</h5>
					<h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
					<div className='text-center'>
					<div className={hasSocial ? classes.socialLinks : classes.hidden}>
						<hr />
						<a className={hasGit ? '' : classes.hidden} href={item.github}><FontAwesomeIcon className={classes.socialLink} icon={ faGithub } /></a>
						<a className={hasTwit ? '' : classes.hidden} href={item.twitter}><FontAwesomeIcon className={classes.socialLink} icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : classes.hidden} href={item.facebook}><FontAwesomeIcon className={classes.socialLink} icon={ faFacebook } /></a>
						<a className={hasIN ? '' : classes.hidden} href={item.linkedin}><FontAwesomeIcon className={classes.socialLink} icon={ faLinkedin } /></a>
					</div>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const gammaClass = this.state.gammaClass.map((item, index)=>{
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
		<Col key={index} className={classes.memberList}>
			<div className={classes.card}>
				<img className={classes.cardImgTop} src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className={classes.cardTitle}>{item.name}</h5>
					<h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
					<div className='text-center'>
					<div className={hasSocial ? classes.socialLinks : classes.hidden}>
						<hr />
						<a className={hasGit ? '' : classes.hidden} href={item.github}><FontAwesomeIcon className={classes.socialLink} icon={ faGithub } /></a>
						<a className={hasTwit ? '' : classes.hidden} href={item.twitter}><FontAwesomeIcon className={classes.socialLink} icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : classes.hidden} href={item.facebook}><FontAwesomeIcon className={classes.socialLink} icon={ faFacebook } /></a>
						<a className={hasIN ? '' : classes.hidden} href={item.linkedin}><FontAwesomeIcon className={classes.socialLink} icon={ faLinkedin } /></a>
					</div>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const deltaClass = this.state.deltaClass.map((item, index)=>{
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
		<Col key={index} className={classes.memberList}>
			<div className={classes.card}>
				<img className={classes.cardImgTop} src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className={classes.cardTitle}>{item.name}</h5>
					<h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
					<div className='text-center'>
					<div className={hasSocial ? classes.socialLinks : classes.hidden}>
						<hr />
						<a className={hasGit ? '' : classes.hidden} href={item.github}><FontAwesomeIcon className={classes.socialLink} icon={ faGithub } /></a>
						<a className={hasTwit ? '' : classes.hidden} href={item.twitter}><FontAwesomeIcon className={classes.socialLink} icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : classes.hidden} href={item.facebook}><FontAwesomeIcon className={classes.socialLink} icon={ faFacebook } /></a>
						<a className={hasIN ? '' : classes.hidden} href={item.linkedin}><FontAwesomeIcon className={classes.socialLink} icon={ faLinkedin } /></a>
					</div>
					</div>
				</div>
			</div>
		</Col>
	  );
    });
	
    const alumniClass = this.state.alumniClass.map((item, index)=>{
	  var position = false;
	  if (item.position != null) {
		  position = true;
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
		<Col key={index} className={classes.memberList}>
			<div className={classes.card}>
				<img className={classes.cardImgTop} src={require(`../../assets/img/${item.imgFile}`)} alt="profile picture"/>
				<div className="card-body">
					<h5 className={classes.cardTitle}>{item.name}</h5>
					<h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
					<p className={position ? classes.cardText : classes.hidden}>{item.position}</p>
					<div className='text-center'>
					<div className={hasSocial ? classes.socialLinks : classes.hidden}>
						<hr />
						<a className={hasGit ? '' : classes.hidden} href={item.github}><FontAwesomeIcon className={classes.socialLink} icon={ faGithub } /></a>
						<a className={hasTwit ? '' : classes.hidden} href={item.twitter}><FontAwesomeIcon className={classes.socialLink} icon={ faTwitterSquare } /></a>
						<a className={hasFace ? '' : classes.hidden} href={item.facebook}><FontAwesomeIcon className={classes.socialLink} icon={ faFacebook } /></a>
						<a className={hasIN ? '' : classes.hidden} href={item.linkedin}><FontAwesomeIcon className={classes.socialLink} icon={ faLinkedin } /></a>
					</div>
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

export default withStyles(styles)(MemberList);