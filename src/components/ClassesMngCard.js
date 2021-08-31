import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { withStyles } from "@material-ui/styles";
import { withFirebase } from "../api/Firebase";
import { compose } from "recompose";

import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  cardImgTop: {
    width: "75%",
    margin: "10% auto",
    borderRadius: "150px",
  },
  card: {
    width: "300px",
    border: "0",
    marginBottom: "25px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)",
    textAlign: "center",
    "&:hover": {
      "-webkit-transform": "translateY(-5px)",
      transform: "translateY(-5px)",
      transition: "all .3s linear",
    },
  },
  cardTitle: {
    fontSize: "30px",
    fontFamily: "Gruppo",
    fontWeight: 1000,
  },
  cardSubtitle: {
    fontSize: "25px",
    fontFamily: "Gruppo",
    fontWeight: 1000,
    color: "#f21131",
  },
  cardText: {
    paddingTop: "5px",
    fontFamily: "Andale Mono, monospace",
  },
  memberList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  btn: {
    backgroundColor: "#f21131",
    borderColor: "#f21131",
    fontFamily: "Gruppo",
    fontWeight: "800",
    fontSize: "15px",
    textTransform: "uppercase",
    "&:hover": {
      backgroundColor: "#C30000",
      borderColor: "#C30000",
    },
  },
  buttonWrapper: {
    paddingBottom: "5px",
  },
  hidden: {
    display: "none",
  },
};

class ClassesMngCardBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteData: false,
      memberClasses: null,
    };

    this.handleToggleDelete = this.handleToggleDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {}

  handleToggleDelete = () => {
    this.setState({
      deleteData: !this.state.deleteData,
    });
  };

  deleteData() {
    this.props.firebase.getConfig().then((doc) => {
      const memberClasses = doc.data().classes;
      delete memberClasses[this.props.data];
      this.props.firebase
        .configDoc()
        .update({ classes: memberClasses })
        .then(() => {
          console.log("Successfully updated Classes");
          this.props.updateFunc();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  render() {
    const { classes } = this.props;

    var item = this.props.data;

    return (
      <Col data={item} key={this.props.key} className={classes.memberList}>
        <div className={classes.card}>
          <div className="card-body">
            <h5 className={classes.cardTitle}>{item}</h5>
            <div className="text-center">
              <div className={classes.buttons}>
                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>

              <div
                className={
                  this.state.deleteData ? classes.buttons : classes.hidden
                }
              >
                <hr />
                <div className={classes.buttonWrapper}>
                  <Button className={classes.btn} onClick={this.deleteData}>
                    Are you Sure??
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}

const ClassesMngCard = compose(
  withFirebase,
  withStyles(styles)
)(ClassesMngCardBase);

export default ClassesMngCard;
