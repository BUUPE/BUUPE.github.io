import React, { Component }from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Header from "../../components/main-site/Header";
import Footer from "../../components/main-site/Footer";
import projectsIMG from "../../assets/img/projects.jpg";

import * as ROUTES from "../../constants/routes";
import { withFirebase } from "../../api/Firebase";
import "../../styles/main-site/main.css";
import { compose } from "recompose";
import { withStyles } from "@material-ui/styles";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

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
};

class MainLandingBase extends Component {
	constructor(props){
		super(props);
		
		this.state = {
			displayApplyPage: false,
			displayInterestForm: false,
		}
	}
	
  getData = () => {
		this.props.firebase.generalSettings().get().then((querySnapshot) => {
			const data = querySnapshot.data();
			
			this.setState({displayApplyPage: data.displayApplyPage, displayInterestForm: data.displayInterestForm}, () => {
				console.log("Data loaded");
			});
		}).catch((err) => {
			console.log(err);
		});
  }
  
  componentDidMount() {
    this.getData();
  }
	
	render() {
		const { classes } = this.props;
		const { displayApplyPage, displayInterestForm } = this.state;
	
		const BobbleForm = () => {
			return (
				<Container className={classes.bobble}>
					<p> Interested in joining UPE? Click <a href="https://upe.bu.edu/interview/interest-form">here</a>. </p>
				</Container>
			);
		};
	
		const BobbleApply = () => {
			return (
				<Container className={classes.bobble}>
					<p> We are now accepting applicantions! Click <a href="https://upe.bu.edu/interview/apply">here</a> to apply. </p>
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
				return (<> </>);
			}
		};
		
		return (
			<div className="landing">
				<Header />

				<Container>
					
					<DisplayBobble />
					
					<Row>
						<Col md={12}>
							<div className="title">
								<h1>About Us</h1>
							</div>
						</Col>
					</Row>

					<Row>
						<Col md={2} />

						<Col md={8}>
							<div className="bodyText text-center">
								<p>
									Upsilon Pi Epsilon (UPE) at BU is an honor society dedicated to
									promoting excellence in technical and computing disciplines.
									UPE's chapter at BU has as it's main focus the improvement of
									it's member's technical skills, as to complement the school's
									great theoretical teaching.
								</p>
							</div>

							<div className="buttonBlock text-center">
								<Button className="btn btn-about">
									<Link className="white-text" to={ROUTES.ABOUT}>
										About Us
									</Link>
								</Button>
							</div>
						</Col>

						<Col md={2} />
					</Row>
				</Container>

				<Container>
					<Row>
						<Col md={12}>
							<div className="title">
								<h1>Our Projects</h1>
							</div>
						</Col>
					</Row>

					<Row>
						<Col md={1} />

						<Col md={4}>
							<img src={projectsIMG} alt="UPE Projects" width="400" />
						</Col>

						<Col md={5}>
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

						<Col md={2} />
					</Row>
				</Container>

				<Footer />
			</div>
		);
	}
};

const MainLanding = compose(
	withFirebase, 
	withStyles(styles),
	withRouter
)(MainLandingBase);

export default MainLanding;