import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitterSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { withStyles } from "@material-ui/styles";
import { withFirebase } from '../../api/Firebase';
import { compose } from 'recompose';

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  cardImgTop: {
    width: '75%',
    margin: '10% auto',
	borderRadius: "150px",
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


class MemberCardBase extends Component {
	constructor(props){
	  super(props);
	  
	  this.state = {
		url: "",
	  }
	}
	
	componentDidMount() {
	  this.props.firebase.getImage(this.props.data.class, this.props.data.imgFile).then(url => {
	    this.setState({ url });
	  })
	}
	
	
	render(){
	const { classes } = this.props;
		
	var item = this.props.data;
	
	var defaultIMG = "https://firebasestorage.googleapis.com/v0/b/upe-website-fa07a.appspot.com/o/default.png?alt=media&token=6cced97e-fb1e-4604-8b5b-81318a52fcc2";
	
	
    var position = false;
    if (item.position !== "" && this.props.pos) {
      position = true;
    }

    var hasGit = false;
    var hasTwit = false;
    var hasFace = false;
    var hasIN = false;
    if (item.github !== "") {
      hasGit = true;
    }
    if (item.twitter !== "") {
      hasTwit = true;
    }
    if (item.facebook !== "") {
      hasFace = true;
    }
    if (item.linkedin !== "") {
      hasIN = true;
    }
    var hasSocial = hasGit || hasFace || hasTwit || hasIN;
	
	return (
	    <Col data={item} key={this.props.key} className={classes.memberList}>
          <div className={classes.card}>
            <img
              className={classes.cardImgTop}
              src={this.state.url || defaultIMG}
              alt="Member"
            />
            <div className="card-body">
              <h5 className={classes.cardTitle}>{item.name}</h5>
              <h6 className={classes.cardSubtitle}>Class of {item.gradYear}</h6>
              <p className={position ? classes.cardText : classes.hidden}>
                {item.position}
              </p>
              <div className="text-center">
                <div
                  className={hasSocial ? classes.socialLinks : classes.hidden}
                >
                  <hr />
                  <a
                    className={hasGit ? "" : classes.hidden}
                    href={item.github}
                  >
                    <FontAwesomeIcon
                      className={classes.socialLink}
                      icon={faGithub}
                    />
                  </a>
                  <a
                    className={hasTwit ? "" : classes.hidden}
                    href={item.twitter}
                  >
                    <FontAwesomeIcon
                      className={classes.socialLink}
                      icon={faTwitterSquare}
                    />
                  </a>
                  <a
                    className={hasFace ? "" : classes.hidden}
                    href={item.facebook}
                  >
                    <FontAwesomeIcon
                      className={classes.socialLink}
                      icon={faFacebook}
                    />
                  </a>
                  <a
                    className={hasIN ? "" : classes.hidden}
                    href={item.linkedin}
                  >
                    <FontAwesomeIcon
                      className={classes.socialLink}
                      icon={faLinkedin}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Col>
	);
	}
}

const MemberCard = compose(
  withFirebase,
  withStyles(styles),
)(MemberCardBase)


export default MemberCard;