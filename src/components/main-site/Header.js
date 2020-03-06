import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/header.css';

class Header extends Component {
  render () {
    return(
	  <div className="masthead">
	    <div>
	  	  <Navbar collapseOnSelect className="mainNav" expand="lg">
            <Navbar.Brand className="brand" href="/">BU UPE</Navbar.Brand>
		    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		    <Navbar.Collapse id="navbarResponsive" className="ml-auto">
		      <Nav className="ml-auto links">
                <Nav.Link className="link" href="#">Home</Nav.Link>
                <NavDropdown title={<span className="link">About</span>} className="dropDowns" id="collasible-nav-dropdown">
                  <NavDropdown.Item className="subLink" href="about">About</NavDropdown.Item>
                  <NavDropdown.Item className="subLink" href="members">Members</NavDropdown.Item>
			      <NavDropdown.Item className="subLink" href="contact">Contact</NavDropdown.Item>
                </NavDropdown>
			    <Nav.Link href="events" className="link">Events</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
		</div>

        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading"></div>
            </div>
          </div>
        </div>
      </div>
	);
  }
}

export default Header;