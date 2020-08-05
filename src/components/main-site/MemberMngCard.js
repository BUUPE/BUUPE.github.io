import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { withStyles } from "@material-ui/styles";
import { withFirebase } from "../../api/Firebase";
import { compose } from "recompose";

import DataEdit from "./DataEdit.js";

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
  buttons: {
    "& hr": {
      borderTop: "3px solid #333",
      borderRadius: "2px",
    },
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

class MemberMngCardBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editData: false,
      editBrownie: false,
      deleteData: false,
    };

    this.handleToggleData = this.handleToggleData.bind(this);
    this.handleToggleDelete = this.handleToggleDelete.bind(this);
    this.deleteData = this.deleteData.bind(this);
  }

  componentDidMount() {}

  handleToggleData = () => {
    this.setState({
      editData: !this.state.editData,
    });
  };

  handleToggleDelete = () => {
    this.setState({
      deleteData: !this.state.deleteData,
    });
  };

  deleteData = () => {
    this.firebase.deleteUser(this.props.data.uid).then(() => {
	  console.log("Deleted user: ", this.props.data.uid);
	  window.location.reload(false);
	});
  };

  render() {
    const { classes } = this.props;

    var item = this.props.data;

    return (
      <Col data={item} key={this.props.key} className={classes.memberList}>
        <div className={classes.card}>
          <div className="card-body">
            <h5 className={classes.cardTitle}>{item.name}</h5>
            <h6 className={classes.cardSubtitle}>{item.email}</h6>
            <div className="text-center">
              <div className={classes.buttons}>
                <hr />
                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleData}
                  >
                    Edit Data
                  </Button>
                </div>

                <div className={classes.buttonWrapper}>
                  <Button
                    className={classes.btn}
                    onClick={this.handleToggleDelete}
                  >
                    Delete Data
                  </Button>
                </div>
              </div>

              <div
                className={
                  this.state.editData ? classes.buttons : classes.hidden
                }
              >
                <hr />
                <DataEdit value={this.props.data} />
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

const MemberMngCard = compose(
  withFirebase,
  withStyles(styles)
)(MemberMngCardBase);

export default MemberMngCard;
