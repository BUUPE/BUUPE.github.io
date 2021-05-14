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
  facebook: "",
  github: "",
  twitter: "",
  linkedin: "",
  name: "",
  file: null,
  error: null,
  fileExtension: "",
};

class DataFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      facebook,
      github,
      linkedin,
      twitter,
      name,
      file,
      fileExtension,
    } = this.state;

    var im = this.props.value.profileIMG;
    if (im === "") im = name.split(" ")[0] + "." + fileExtension;

    var face = "";
    if (this.props.value.socials && !!this.props.value.socials.facebook)
      face = this.props.value.socials.facebook;
    if (facebook !== "") face = facebook;

    var tw = "";
    if (this.props.value.socials && !!this.props.value.socials.twitter)
      tw = this.props.value.socials.twitter;
    if (twitter !== "") tw = twitter;

    var git = "";
    if (this.props.value.socials && !!this.props.value.socials.github)
      git = this.props.value.socials.github;
    if (github !== "") git = github;

    var lin = "";
    if (this.props.value.socials && !!this.props.value.socials.linkedin)
      lin = this.props.value.socials.linkedin;
    if (linkedin !== "") lin = linkedin;

    var n = this.props.value.name;
    if (name !== "") n = name;

    const data = {
      name: n,
      profileIMG: im,
      socials: {
        facebook: face,
        github: git,
        linkedin: lin,
        twitter: tw,
      },
    };

    if (file !== null) {
      this.props.firebase.delImage(
        this.props.value.upe.class,
        this.props.value.profileIMG
      );
      var uploadTask = this.props.firebase
        .uploadImage(this.props.value.upe.class, im)
        .put(file);

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

    this.props.firebase
      .editUser(this.props.value.uid, data)
      .then(() => {
        this.props.updateFunc();
        this.setState({ ...INITIAL_STATE });
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

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

  render() {
    const { classes } = this.props;
    const {
      facebook,
      github,
      linkedin,
      twitter,
      name,
      error,
      file,
    } = this.state;
    const isInvalid =
      name === "" &&
      facebook === "" &&
      github === "" &&
      linkedin === "" &&
      twitter === "" &&
      file === null;
    return (
      <Container className={classes.wrapper}>
        <div className={classes.card}>
          <Form onSubmit={this.onSubmit}>
            <div className={classes.title}>
              <h1>Account Data</h1>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Name</h1>
              <InputGroup>
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Adam Smith"
                  value={name}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>Twitter</h1>
              <InputGroup>
                <Form.Control
                  name="twitter"
                  type="url"
                  placeholder="https://twitter.com/..."
                  value={twitter}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>GitHub</h1>
              <InputGroup>
                <Form.Control
                  name="github"
                  type="url"
                  placeholder="http://github.com/..."
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
                  placeholder="https://www.facebook.com/..."
                  value={facebook}
                  onChange={this.onChange}
                />
              </InputGroup>
            </div>

            <div className={classes.inputWrapper}>
              <h1>LinkedIn</h1>
              <InputGroup>
                <Form.Control
                  name="linkedin"
                  type="url"
                  placeholder="https://www.linkedin.com/..."
                  value={linkedin}
                  onChange={this.onChange}
                />
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

            <div className={classes.buttonGroup}>
              <Row>
                <Col>
                  <Button disabled={isInvalid} type="submit" className="btn">
                    Update Data
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

const DataForm = compose(withFirebase, withStyles(styles))(DataFormBase);

export default DataForm;
