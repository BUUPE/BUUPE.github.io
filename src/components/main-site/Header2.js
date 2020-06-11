import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

import { compose } from 'recompose';
import { withStyles } from "@material-ui/styles";

import * as ROUTES from "../../constants/routes";

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

class Header2Base extends Component {
	render() {
	  const { classes } = this.props;
	  return(
        <div>
          <div>
            <Navbar collapseOnSelect className={classes.mainNav} expand="lg">
              <Navbar.Brand className={classes.mainNavBrand} href={ROUTES.LANDING}>
                <span>BU UPE</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="navbarResponsive" className="ml-auto">
                <div className="ml-auto">
                  <Nav className={classes.mainNavLinks}>
                    <Nav.Link className={classes.mainNavLinksLink} href={ROUTES.LANDING}>
                      <span>Main Site</span>
                    </Nav.Link>
	                <Nav.Link className={classes.mainNavLinksLink} href={ROUTES.LOGOUT}>
                      <span>Log Out</span>
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
	}
}

const Header2 = compose(
  withStyles(styles),
)(Header2Base)

export default Header2;
