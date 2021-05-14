import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

import { compose } from "recompose";
import { withStyles } from "@material-ui/styles";

import * as ROUTES from "../constants/routes";

import img from "../assets/img/header.jpg";

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
    paddingLeft: "20px",
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
    paddingLeft: "30px",
    verticalAlign: "middle",
    "& p": {
      textAlign: "center",
      verticalAlign: "middle",
    },
  },
  mainNavLinksDropDownsSubLink: {
    fontFamily: "Andale Mono, monospace",
    fontWeight: "600",
    color: "#333",
    textDecoration: "none",
    verticalAlign: "middle",
    "&:hover": {
      textDecoration: "none",
      color: "#f21131",
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
  loginIcon: {
    color: "white",
    fontSize: "30px",
    transition: "all .3s linear",
    "&:hover": {
      color: "#f21131",
      "-webkit-transform": "translateY(-2px)",
      transform: "translateY(-2px)",
      transition: "all .3s linear",
    },
  },
};

class Header2Base extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <div>
            <Navbar collapseOnSelect className={classes.mainNav} expand="lg">
              <Link to={ROUTES.LANDING}>
                <Navbar.Brand className={classes.mainNavBrand}>
                  <span>BU UPE</span>
                </Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="navbarResponsive" className="ml-auto">
                <div className="ml-auto">
                  <Nav className={classes.mainNavLinks}>
                    <Link
                      className={classes.mainNavLinksLink}
                      to={ROUTES.LANDING}
                    >
                      <span>Main Site</span>
                    </Link>
                    <Link
                      className={classes.mainNavLinksLink}
                      to={ROUTES.LOGOUT}
                    >
                      <span>Log Out</span>
                    </Link>
                  </Nav>
                </div>
              </Navbar.Collapse>
            </Navbar>
          </div>
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

const Header2 = compose(withStyles(styles))(Header2Base);

export default Header2;
