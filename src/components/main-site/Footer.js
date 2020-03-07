import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faFacebook, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'

import { Link } from "react-router-dom";

class Footer extends Component {
  render () {
    return(
	  <div>
		<div className="footer text-center">
		  <Container>
			<Row>
			
			  <div className="col-lg-4 mb-5 mb-lg-0">
				<p></p>
			  </div>

			  <div className="col-lg-4 mb-5 mb-lg-0">
				
				<div className="text-white copyright">
				  <small>Copyright &copy; BU UPE 2020</small>
				</div>
				
				<div className="links">
				  <span>
				    <a className="iconLink" href="https://github.com/BUUPE/"><FontAwesomeIcon className="icon" icon={ faGithub } /></a> 
				  </span>
				  <span>
				    <a className="iconLink" href="https://www.facebook.com/upeatbu/"> <FontAwesomeIcon className="icon" icon={ faFacebook } /></a> 
				  </span>
				  <span>
				    <a className="iconLink" href="https://twitter.com/bu_upe"> <FontAwesomeIcon className="icon" icon={ faTwitterSquare } /></a>
				  </span>
				</div>
				
			  </div>

			</Row>
		  </Container>
		</div>
	  
	  </div>
	);
  }
}

export default Footer;