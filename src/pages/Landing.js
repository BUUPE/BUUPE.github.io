import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

import * as ROUTES from "../constants/routes";
import { withFirebase } from "../api/Firebase";
import "../styles/main.css";
import { compose } from "recompose";
import { withStyles } from "@material-ui/styles";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import HeaderPhoto from "../components/HeaderPhoto";

const styles = {
  bobble: {
    backgroundColor: "#e8e88c",
    fontWeight: "600",
    fontSize: "20px",
    borderRadius: "10px",
    textAlign: "center",
    paddingBottom: "1px",
    paddingTop: "15px",
  },
  container: {
    maxWidth: "1000px",
  },
  col1: {
    position: "relative",
    left: "-100px",
  },
  col2: {
    position: "relative",
    left: "+40px",
  },
};

class MainLandingBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayApplyPage: false,
      displayInterestForm: false,
	  ytEmbed: "https://www.youtube.com/embed/NTuI2b9hZGM",
    };
  }

  getData = () => {
    this.props.firebase
      .generalSettings()
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.data();

        this.setState({
          displayApplyPage: data.displayApplyPage,
          displayInterestForm: data.displayInterestForm,
		  ytEmbed: data.ytEmbed,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { classes } = this.props;
    const { displayApplyPage, displayInterestForm, ytEmbed } = this.state;

    const BobbleForm = () => {
      return (
        <Container className={classes.bobble}>
          <p>
            Interested in joining UPE? Click
            <a href="https://upe.bu.edu/interview/interest-form">here</a>.
          </p>
        </Container>
      );
    };

    const BobbleApply = () => {
      return (
        <Container className={classes.bobble}>
          <p>
            We are now accepting applications! Click
            <a href="https://upe.bu.edu/interview/apply">here</a> to apply.
          </p>
        </Container>
      );
    };

    const DisplayBobble = () => {
      if (displayApplyPage) {
        return (
          <Row>
            <Col md={5} />
            <Col md={7}>
              <BobbleApply />
            </Col>
          </Row>
        );
      } else if (displayInterestForm) {
        return (
          <Row>
            <Col md={6} />
            <Col md={6}>
              <BobbleForm />
            </Col>
          </Row>
        );
      } else {
        return <> </>;
      }
    };

    return (
      <div className="landing">
        <Header />
        <HeaderPhoto />

        <Container style={styles.container}>
          <DisplayBobble />

          <Row>
            <Col md={6}>
              <div className="title">
                <h1>About Us</h1>
              </div>
            </Col>

            <Col md={2} />

            <Col md={4}>
              <div className="title">
                <h1>Our Projects</h1>
              </div>
            </Col>
          </Row>
        </Container>

        <Container>
          <Row>
            <Col md={6} style={styles.col1}>
              <div className="bodyText text-center">
                <p>
                  Upsilon Pi Epsilon (UPE) at BU is an honor society dedicated
                  to promoting excellence in technical and computing
                  disciplines. UPE's chapter at BU has as it's main focus the
                  improvement of it's member's technical skills, as to
                  complement the school's great theoretical teaching.
                </p>
              </div>

              <div className="buttonBlock text-center">
                <Button className="btn btn-about">
                  <Link className="white-text" to={ROUTES.ABOUT}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </Col>

            <Col md={6} style={styles.col2}>
              <div className="bodyText text-center">
                <p>
                  Both UPE as an organization, and each of our dedicated members
                  are constantly working on amazing projects both related to the
                  org. or otherwise!
                </p>
              </div>

              <div className="buttonBlock text-center">
                <Button
                  className="btn btn-about"
                  href="https://github.com/BUUPE/"
                >
                  Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="bodyText text-center">
          <Container>
            <Row>
              <h1> Check out the latest episode of our podcast! </h1>
              <Col md={12}>
                <iframe
                  width="560"
                  height="315"
				  src={ytEmbed}
                  title="UPE Hotspot"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }
}

const MainLanding = compose(
  withFirebase,
  withStyles(styles),
  withRouter
)(MainLandingBase);

export default MainLanding;
