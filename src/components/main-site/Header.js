import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { withStyles } from "@material-ui/styles";

import img from "../../assets/img/header.jpg";

const styles = {
  mainNav: {
    paddingTop: "10px",
    paddingBottom: "10px",
    fontfamily: "Andale Mono, monospace",
    borderTop: "3px solid #f21131",
    backgroundColor: "#333",
  },
  mainNavBrand: {
    "& span": {
      fontFamily: "Gruppo",
      fontSize: "36px",
      margin: 0,
      lineHeight: 1,
      fontWeight: 800,
      letterSpacing: "3px",
      textTransform: "uppercase",
      color: "#f21131",
      transition: "all .3s",
      "@media only screen and (max-width:992px)": {
        paddingLeft: "20px",
      },
      "@media only screen and (min-width:992px)": {
        paddingLeft: "300px",
      },
      "&:hover": {
        color: "#C30000",
        textDecoration: "none",
      },
    },
  },
  mainNavLinks: {
    fontSize: "20px",
    paddingRight: "300px",
  },
  mainNavLinksLink: {
    paddingLeft: "30px",
    color: "#fff",
    "&:hover": {
      color: "#f21131",
      textDecoration: "none",
    },
    "& span": {
      paddingLeft: "30px",
      color: "#fff",
      "&:hover": {
        color: "#f21131",
        textDecoration: "none",
      },
    },
  },
  mainNavLinksDropDowns: {
    "&::after": {
      display: "none",
    },
  },
  mainNavLinksDropDownsSubLink: {
    fontFamily: "Andale Mono, monospace",
    fontWeight: "600",
  },
  masthead: {
    marginBottom: "50px",
    background: "no-repeat center center",
    backgroundColor: "#868e96",
    backgroundAttachment: "scroll",
    position: "relative",
    backgroundSize: "cover",
    backgroundImage: `url(${img})`,
  },
  mastheadSiteHeading: {
    padding: "200px 0 150px",
    color: "#fff",
    "@media only screen and (min-width:768px)": {
      padding: "200px 0!important",
    },
  },
};



const Header = ({classes}) => (
  <div>
    <div>
      <Navbar collapseOnSelect className={classes.mainNav} expand="lg">
        <Navbar.Brand className={classes.mainNavBrand} href="/">
          <span>BU UPE</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="navbarResponsive" className="ml-auto">
          <div className="ml-auto">
            <Nav className={classes.mainNavLinks}>
              <Nav.Link className={classes.mainNavLinksLink} href="/">
                <span>Home</span>
              </Nav.Link>
              <NavDropdown
                title={
                  <span className={classes.mainNavLinksLink}>About</span>
                }
                className={classes.mainNavLinksDropDowns}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item
                  className={classes.mainNavLinksDropDownsSubLink}
                  href="about"
                >
                  About
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={classes.mainNavLinksDropDownsSubLink}
                  href="members"
                >
                  Members
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={classes.mainNavLinksDropDownsSubLink}
                  href="contact"
                >
                  Contact
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className={classes.mainNavLinksLink} href="events">
                <span>Events</span>
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>

    <div className={classes.masthead}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <div className={classes.mastheadSiteHeading} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default withStyles(styles)(Header);
