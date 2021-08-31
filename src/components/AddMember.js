import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Container from "react-bootstrap/Container";
import { withStyles } from "@material-ui/styles";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.min.css";

import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

const axios = require("axios");

const styles = {
  card: {
    width: "400px",
    border: 0,
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  wrapper: {
    paddingTop: "50px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  inputWrapper: {
    padding: "0px 10px 50px 10px",
    "& h1": {
      fontSize: "30px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
      color: "#f21131",
    },
  },
  title: {
    paddingTop: "15px",
    "& h1": {
      fontSize: "50px",
      fontFamily: "Gruppo",
      fontWeight: 1000,
    },
  },
  buttonGroup: {
    paddingBottom: "15px",
    "& .btn": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
      fontFamily: "Gruppo",
      fontWeight: "800",
      fontSize: "20px",
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#6C0000",
        borderColor: "#6C0000",
        fontFamily: "Gruppo",
        fontWeight: "800",
        fontSize: "20px",
        textTransform: "uppercase",
      },
      "& a": {
        color: "#fff",
        textDecoration: "none",
      },
    },
  },
  fileUpload: {
    textAlign: "center",
  },
};

const INITIAL_STATE = {
  name: "",
  email: "",
  className: "",
  gradYear: 0,
  file: null,
  eboard: false,
  position: "",
  positionRank: -1,
  twitter: "",
  github: "",
  facebook: "",
  linkedin: "",
  error: null,
  fileExtension: "",
  memberClasses: [],
};

class AddMemberBase extends Component {
  state = { ...INITIAL_STATE };

  componentDidMount() {
    this.getClasses();
  }

  getClasses() {
    this.props.firebase.getConfig().then((doc) => {
      const memberClasses = Object.entries(doc.data().classes)
        .sort((a, b) => (b[1] > a[1] ? 1 : -1))
        .map((c) => c[0]);
      this.setState({ memberClasses });
    });
  }

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onFileChange = (event) => {
    var f = event.target.files[0];
    console.log(f);
    if (f.type !== "image/jpeg" && f.type !== "image/png") {
      console.log("Invalid file type");
      f = null;
    } else {
      var fileExtension = "jpg";
      if (f.type.split("/")[1] === "png") fileExtension = "png";
      this.setState({ fileExtension: fileExtension });
    }

    this.setState({ file: f });
  };

  onPositionChange = (event) => {
    var p = event.target.value;
    var pR = -1;
    var eb = true;
    if (p === "President") {
      pR = 0;
    } else if (p === "Vice President") {
      pR = 1;
    } else if (p === "Secretary") {
      pR = 2;
    } else if (p === "Treasurer") {
      pR = 3;
    } else if (p === "Director of Operations") {
      pR = 4;
    } else if (p === "Director of Recruitment") {
      pR = 5;
    } else if (p === "Director of Internal Development") {
      pR = 6;
    } else if (p === "Director of Marketing") {
      pR = 7;
    } else if (p === "Member") {
      pR = -2;
      eb = false;
    } else {
      pR = 10;
      eb = false;
    }

    this.setState({ position: p, positionRank: pR, eboard: eb });
  };

  onSubmit = (event) => {
    const {
      email,
      name,
      className,
      gradYear,
      file,
      position,
      positionRank,
      eboard,
      twitter,
      github,
      facebook,
      linkedin,
      fileExtension,
    } = this.state;

    var im = name.split(" ")[0] + "." + fileExtension;

    const data = {
      email: email,
      name: name,
      gradYear: gradYear,
      profileIMG: im,
      upe: {
        position: position,
        positionRank: positionRank,
        class: className,
        rp: 0,
        bp: 0,
      },
      socials: {
        facebook: facebook,
        github: github,
        linkedin: linkedin,
        twitter: twitter,
      },
      roles: {
        eboard: eboard,
        upemember: true,
        nonmember: false,
      },
    };

    if (file !== null) {
      var uploadTask = this.props.firebase.uploadImage(className, im).put(file);

      uploadTask.on(
        "state_changed",
        function (snapshot) {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        function (error) {
          console.log(error);
        },
        function () {
          console.log("Upload Successful!");
        }
      );
    }

    this.props.firebase.getIdToken().then(async (token) => {
      const body = {
        emails: [email],
      };
      const res = await axios
        .post("https://upe-authenticator.herokuapp.com/generateUIDs", body, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          crossdomain: true,
        })
        .catch((error) => {
          console.log(error.response);
        });
      this.props.firebase
        .addUser(res.data[0].uid, data)
        .then(() => {
          console.log(
            "Successfully created database entry for user ",
            res.data[0].uid
          );
          this.props.updateFunc();
          this.setState({ ...INITIAL_STATE }, this.getClasses());
        })
        .catch((error) => {
          console.log(error);
        });
    });

    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    const {
      name,
      email,
      className,
      gradYear,
      position,
      twitter,
      github,
      facebook,
      linkedin,
      error,
    } = this.state;
    const isInvalid =
      name === "" ||
      email === "" ||
      className === "" ||
      gradYear === 0 ||
      position === "";

    const year = new Date().getFullYear();
    const years = [];
    for (let i = year; i <= year + 5; i++) {
      years.push(i);
    }

    const classList = this.state.memberClasses;
    const positionList = [
      "President",
      "Vice President",
      "Secretary",
      "Treasurer",
      "Director of Operations",
      "Director of Recruitment",
      "Director of Internal Development",
      "Director of Marketing",
      "Member",
    ];

    return (
      <Container className={classes.wrapper}>
        <div className={classes.card}>
          <Form onSubmit={this.onSubmit}>
            <div className={classes.title}>
              <h1>New Account</h1>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Name</h1>
              <InputGroup>
                <Form.Control
                  required
                  name="name"
                  type="text"
                  placeholder="Adam Smith"
                  value={name}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Email</h1>
              <InputGroup>
                <Form.Control
                  required
                  name="email"
                  type="email"
                  placeholder="upe@bu.edu"
                  value={email}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Class</h1>
              <InputGroup>
                <Form.Control
                  required
                  name="className"
                  as="select"
                  value={className}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {classList.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Grad. Year</h1>
              <InputGroup>
                <Form.Control
                  required
                  name="gradYear"
                  as="select"
                  value={gradYear}
                  onChange={this.onChange}
                >
                  <option value="">-</option>
                  {years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Position</h1>
              <InputGroup>
                <Form.Control
                  name="position"
                  as="select"
                  value={position}
                  onChange={this.onPositionChange}
                >
                  <option value="">-</option>
                  {positionList.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </Form.Control>
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Profile Image</h1>
              <input
                type="file"
                name="file"
                className={classes.fileUpload}
                onChange={this.onFileChange}
                accept=".jpg,.png"
              />
            </div>

            <div className={classes.inputWrapper}>
              <h1>Twitter</h1>
              <InputGroup>
                <Form.Control
                  name="twitter"
                  type="url"
                  placeholder="http://twitter.com/"
                  value={twitter}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Github</h1>
              <InputGroup>
                <Form.Control
                  name="github"
                  type="url"
                  placeholder="http://github.com/"
                  value={github}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Facebook</h1>
              <InputGroup>
                <Form.Control
                  name="facebook"
                  type="url"
                  placeholder="https://www.facebook.com/"
                  value={facebook}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Linkedin</h1>
              <InputGroup>
                <Form.Control
                  name="linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/"
                  value={linkedin}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.buttonGroup}>
              <Row>
                <Col>
                  <Button disabled={isInvalid} type="submit" className="btn">
                    Add User
                  </Button>
                </Col>
              </Row>
            </div>

            {error && <p className="error-msg">{error.message}</p>}
          </Form>
        </div>
      </Container>
    );
  }
}

const AddMember = compose(withFirebase, withStyles(styles))(AddMemberBase);

export default AddMember;
